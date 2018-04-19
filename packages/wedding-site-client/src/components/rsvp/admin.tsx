import React from 'react';
import { Button, Alert, Spin, Table, Modal, Input, Select, List, Checkbox, notification } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ApolloFetch } from 'apollo-fetch';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';


/** Query ALL THE THINGS */
const FULL_RSVPS_QUERY = `
    query {
        rsvps {
            invitationId
            invitationName
            address {
                houseNumber
                streetAddress
                aptNumber
                city
                state
                zip
            }
            guests {
                guestId
                firstName
                lastName
                nicknames
                status
                givenPlusOne
                plusOne {
                    taken
                    firstName
                    lastName
                }
                whoseGuest
                guestType
                lastUpdatedByGuest
                lastUpdatedByGuestTimestamp
                lastUpdatedByAdminTimestamp
            }
        }
    }
`;

interface Invitation {
    invitationId: number;
    invitationName: string;
    address: Address;
    guests: Guest[];
}

interface Address {
    houseNumber: string;
    streetAddress: string;
    aptNumber: string | null;
    city: string;
    state: string;
    zip: string;
}

interface Guest {
    guestId: number;
    firstName: string;
    lastName: string;
    nicknames: string[];
    status: string;
    givenPlusOne: boolean;
    plusOne: PlusOne | null;
    whoseGuest: string;
    guestType: string;
    lastUpdatedByGuest: string;
    lastUpdatedByGuestTimestamp: string;
    lastUpdatedByAdminTimestamp: string;
}

interface PlusOne {
    taken: boolean;
    firstName: string | null;
    lastName: string | null;
}

interface AdminProps {
    fetch: ApolloFetch;
    onLogout: () => void;
}

interface AdminState {
    rsvps: Invitation[];
    loading: boolean;
    error: string | null;
}

export default class Admin extends React.PureComponent<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);

        this.state = {
            loading: true,
            rsvps: [],
            error: null
        };
    }

    async componentDidMount() {
        await this.load();
    }

    refresh = async () => {
        this.setState({ loading: true });
        await this.load();
    }

    load = async () => {
        const response = await this.props.fetch({ query: FULL_RSVPS_QUERY });
        if (response.errors) {
            let message: string;
            try {
                message = JSON.parse(response.errors[0].message).message;
            } catch {
                message = `Something went wrong: "${response.errors[0].message}"`;
            }
            this.setState({ loading: false, error: message });
        } else {
            this.setState({ loading: false, rsvps: response.data.rsvps });
        }
    }

    render() {
        const { rsvps, loading, error } = this.state;

        return <>
            <span>CURRENTLY LOGGED IN AS ADMIN</span>
            <Button onClick={this.props.onLogout}>Log Out</Button>
            {error ? <Alert type="error" message="Error" description={error} showIcon />
            : loading ? <div style={{ display: 'flex', justifyContent: 'space-around' }}><Spin /></div>
            : <RsvpList rsvps={rsvps} fetch={this.props.fetch} refresh={this.refresh} />}
        </>
    }
}

interface RsvpListProps {
    rsvps: Invitation[];
    fetch: ApolloFetch;
    refresh: () => void;
}

class InvitationTable extends Table<Invitation> {}
class InvitationColumn extends Table.Column<Invitation> {}

function RsvpList({ rsvps, fetch, refresh }: RsvpListProps) {
    return (
        <InvitationTable
            dataSource={rsvps}
            rowKey="invitationId"
            expandedRowRender={_ => <GuestList guests={_.guests} fetch={fetch} refresh={refresh} />}
            pagination={false}
        >
            <InvitationColumn title="Invite Name" dataIndex="invitationName" defaultSortOrder="ascend" />
            <InvitationColumn title="House Number" dataIndex="address.houseNumber" />
            <InvitationColumn title="Address" key="address" render={(_, i) => <Address address={i.address} />} />
        </InvitationTable>
    )
}

function Address({ address }: { address: Address }) {
    return <>
        {address.streetAddress} {address.aptNumber}
        {address.city}, {address.state} {address.zip}
    </>
}

class GuestTable extends Table<Guest> {}
class GuestColumn extends Table.Column<Guest> {}

interface GuestListProps {
    refresh: () => void
    guests: Guest[];
    fetch: ApolloFetch;
}

interface GuestListState {
    showModal: boolean;
    guestToEdit: Guest | null;
    nicknamesToAdd: string[] | null;
    nicknamesToDelete: string[] | null;
    addingNickname: string;
}

class GuestList extends React.PureComponent<GuestListProps, GuestListState> {
    state: GuestListState = { showModal: false, guestToEdit: null, nicknamesToAdd: null, nicknamesToDelete: null, addingNickname: '' };

    onManageClick = (guest: Guest) => this.setState({ showModal: true, guestToEdit: { ...guest } });

    handleError = (errors: any) => {
        let message: string;
        try {
            message = JSON.parse(errors[0].message).message;
        } catch {
            message = `Something went wrong: "${errors[0].message}"`;
        }
        notification.error({
            message: 'Error',
            description: message,
            duration: 15
        });
    }

    submitGuest = async () => {
        const { guestId, firstName, lastName, givenPlusOne, whoseGuest, guestType, plusOne, status } = this.state.guestToEdit;
        const { nicknamesToAdd, nicknamesToDelete } = this.state;
        let response = await this.props.fetch({
            query: `
                mutation {
                    editGuest(guestId: ${guestId}, firstName: "${firstName}", lastName: "${lastName}", plusOne: ${givenPlusOne}, owner: "${whoseGuest}", type: "${guestType}") {
                        guest { guestId }
                        ${nicknamesToAdd.map((_, i) => `addedNickname${i}: addNickname(name: "${_}")`).join('\n')}
                        ${nicknamesToDelete.map((_, i) => `deletedNickname${i}: removeNickname(name: "${_}")`).join('\n')}
                    }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        const existingGuest = this.props.guests.find(_ => _.guestId === guestId);
        if (existingGuest.status !== status) {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setRsvpStatus(guestId: ${guestId}, status: "${status}") { guest { guestId } }
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        if (plusOne) {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setPlusOneStatus(guestId: ${guestId}, taking: ${plusOne.taken}, firstName: "${plusOne.firstName}", lastName: "${plusOne.lastName}")
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        this.closeModal();
        this.props.refresh();
    }

    closeModal = () => this.setState({ showModal: false, guestToEdit: null, nicknamesToAdd: null, nicknamesToDelete: null, addingNickname: '' });

    editGuestInput = (key: keyof Guest) => (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit,
            [key]: event.currentTarget.value
        }
    });

    editGuestSelect = (key: keyof Guest) => (value: SelectValue) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit,
            [key]: value as string
        }
    });

    getNicknames = () => [...this.state.guestToEdit.nicknames.filter(_ => !this.state.nicknamesToDelete.includes(_)), ...this.state.nicknamesToAdd];

    removeNickname = (name: string) => () => {
        if (this.state.nicknamesToAdd.includes(name))
            this.setState({ nicknamesToAdd: this.state.nicknamesToAdd.filter(_ => _ !== name) });
        else if (this.state.guestToEdit.nicknames.includes(name))
            this.setState({ nicknamesToDelete: [...this.state.nicknamesToDelete, name] });
    }

    addNickname = () => {
        const name = this.state.addingNickname;
        if (this.state.nicknamesToDelete.includes(name))
            this.setState({ nicknamesToDelete: this.state.nicknamesToDelete.filter(_ => _ !== name) });
        else if (!this.state.guestToEdit.nicknames.includes(name) && !this.state.nicknamesToAdd.includes(name))
            this.setState({ nicknamesToAdd: [...this.state.nicknamesToAdd, name] });
    }

    setGivenPlusOne = (event: CheckboxChangeEvent) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit,
            givenPlusOne: event.target.checked,
            plusOne: this.state.guestToEdit.plusOne || { taken: false, firstName: null, lastName: null }
        }
    });

    editPlusOneCheckbox = (key: keyof PlusOne) => (event: CheckboxChangeEvent) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit,
            plusOne: {
                ...this.state.guestToEdit.plusOne,
                [key]: event.target.value
            }
        }
    });

    editPlusOneInput = (key: keyof PlusOne) => (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit,
            plusOne: {
                ...this.state.guestToEdit.plusOne,
                [key]: event.currentTarget.value
            }
        }
    });

    render() {
        const { guests } = this.props;
        const { showModal, guestToEdit } = this.state;

        return (
            <>
                <GuestTable dataSource={guests} rowKey="guestId" pagination={false}>
                    <GuestColumn title="First Name" dataIndex="firstName" />
                    <GuestColumn title="Last Name" dataIndex="lastName" />
                    <GuestColumn title="Status" dataIndex="status" />
                    <GuestColumn title="Given Plus One" dataIndex="givenPlusOne" />
                    <GuestColumn title="Owner" dataIndex="whoseGuest" />
                    <GuestColumn title="Type" dataIndex="guestType" />
                    <GuestColumn title="Last Updated By" key="lastUpdatedByGuest" render={(_, g) => <GuestUpdateDate guest={g} />} />
                    <GuestColumn title="Last Updated By Me" dataIndex="lastUpdatedByAdminTimestamp" />
                    <GuestColumn title="Manage" key="manage" render={(_, g) => <Button onClick={() => this.onManageClick(g)} />} />
                </GuestTable>
                {showModal && <Modal title="Manage Guest" visible={showModal} onOk={this.submitGuest} onCancel={this.closeModal}>
                    <h3>Name</h3>
                    <Input placeholder="First Name" value={guestToEdit.firstName} onChange={this.editGuestInput('firstName')} />
                    <Input placeholder="Last Name" value={guestToEdit.lastName} onChange={this.editGuestInput('lastName')} />
                    <h3>Status</h3>
                    <Select value={guestToEdit.status} onChange={this.editGuestSelect('status')}>
                        <Select.Option value="NO_RSVP">No RSVP</Select.Option>
                        <Select.Option value="ATTENDING">Attending</Select.Option>
                        <Select.Option value="NOT_ATTENDING">Not attending</Select.Option>
                    </Select>
                    <h3>Owner</h3>
                    <Select value={guestToEdit.whoseGuest} onChange={this.editGuestSelect('whoseGuest')}>
                        <Select.Option value="BRIDE">Bride</Select.Option>
                        <Select.Option value="GROOM">Groom</Select.Option>
                    </Select>
                    <h3>Type</h3>
                    <Select value={guestToEdit.guestType} onChange={this.editGuestSelect('guestType')}>
                        <Select.Option value="FAMILY">Family</Select.Option>
                        <Select.Option value="FAMILY_FRIEND">Family friend</Select.Option>
                        <Select.Option value="FRIEND">Friend</Select.Option>
                        <Select.Option value="PARTY">Wedding party</Select.Option>
                    </Select>
                    <h3>Nicknames</h3>
                    <List
                        bordered
                        dataSource={this.getNicknames()}
                        renderItem={_ => <List.Item>{_}<Button onClick={this.removeNickname(_)}>Remove</Button></List.Item>}
                    />
                    <Input placeholder="Add nickname" value={this.state.addingNickname} onChange={_ => this.setState({ addingNickname: _.currentTarget.value })} />
                    <Button onClick={this.addNickname}>Add</Button>
                    <h3>Plus One</h3>
                    <Checkbox value={guestToEdit.givenPlusOne} onChange={this.setGivenPlusOne}>Given Plus One?</Checkbox>
                    {guestToEdit.givenPlusOne && <>
                        <Checkbox value={guestToEdit.plusOne.taken} onChange={this.editPlusOneCheckbox('taken')}>Taking?</Checkbox>
                        {guestToEdit.plusOne.taken && <>
                            <Input placeholder="First name" value={guestToEdit.plusOne.firstName} onChange={this.editPlusOneInput('firstName')} />
                            <Input placeholder="Last name" value={guestToEdit.plusOne.lastName} onChange={this.editPlusOneInput('lastName')} />
                        </>}
                    </>}
                </Modal>}
            </>
        )
    }
}

function GuestUpdateDate({ guest }: { guest: Guest }) {
    return <>
        {guest.lastUpdatedByGuest}: {guest.lastUpdatedByGuestTimestamp}
    </>
}
