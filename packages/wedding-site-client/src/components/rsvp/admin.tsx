import React from 'react';
import { Button, Alert, Spin, Table, Modal, Input, Select, List, Checkbox, notification } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { ApolloFetch } from 'apollo-fetch';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from './admin.less';


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
    mealChoice: string;
    whoseGuest: string;
    guestType: string;
    lastUpdatedByGuestTimestamp: string;
    lastUpdatedByAdminTimestamp: string;
}

interface PlusOne {
    taken: boolean;
    firstName: string | null;
    lastName: string | null;
    mealChoice: string | null;
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

interface RsvpListState {
    showModal: boolean;
    inviteToEdit: Invitation | null;
    adding: boolean;
}

class InvitationTable extends Table<Invitation> {}
class InvitationColumn extends Table.Column<Invitation> {}

class RsvpList extends React.PureComponent<RsvpListProps, RsvpListState> {
    state: RsvpListState = { showModal: false, inviteToEdit: null, adding: false };

    onManageClick = (invite: Invitation) => this.setState({ showModal: true, inviteToEdit: { ...invite }, adding: false });

    openToAdd = () => this.setState({ showModal: true, inviteToEdit: this.getNewInvite(), adding: true });

    closeModal = () => this.setState({ showModal: false, inviteToEdit: null });

    getNewInvite = (): Invitation => ({
        invitationId: -1,
        invitationName: '',
        guests: [],
        address: {
            houseNumber: '',
            streetAddress: '',
            aptNumber: null,
            city: '',
            state: '',
            zip: ''
        }
    })

    editInput = (key: keyof Invitation) => (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        inviteToEdit: {
            ...this.state.inviteToEdit!,
            [key]: event.currentTarget.value
        }
    });

    editAddressInput = (key: keyof Address) => (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        inviteToEdit: {
            ...this.state.inviteToEdit!,
            address: {
                ...this.state.inviteToEdit!.address,
                [key]: event.currentTarget.value
            }
        }
    });

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
            duration: 0
        });
    }

    addInvite = async () => {
        const { invitationName, address: { houseNumber, streetAddress, aptNumber, city, state, zip } } = this.state.inviteToEdit!;
        let response = await this.props.fetch({
            query: `
                mutation {
                    addInvitation(invitationName: "${invitationName}", houseNumber: "${houseNumber}", streetAddress: "${streetAddress}", aptNumber: "${aptNumber || ''}", city: "${city}", state: "${state}", zip: "${zip}") {
                        invitation { invitationId }
                    }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        this.closeModal();
        this.props.refresh();
    }

    submitInvite = async () => {
        const { invitationId, invitationName, address: { houseNumber, streetAddress, aptNumber, city, state, zip } } = this.state.inviteToEdit!;
        let response = await this.props.fetch({
            query: `
                mutation {
                    editInvitation(invitationId: ${invitationId}, invitationName: "${invitationName}", houseNumber: "${houseNumber}", streetAddress: "${streetAddress}", aptNumber: "${aptNumber || ''}", city: "${city}", state: "${state}", zip: "${zip}") {
                        invitation { invitationId }
                    }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        this.closeModal();
        this.props.refresh();
    }

    deleteInvite = (invitationId: number) => async () => {
        const response = await this.props.fetch({
            query: `
                mutation {
                    deleteInvitation(invitationId: ${invitationId}) { invitationId }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        this.closeModal();
        this.props.refresh();
    }

    render() {
        const { rsvps, fetch, refresh } = this.props;
        const { showModal, inviteToEdit, adding } = this.state;
        return (
            <>
                <InvitationTable
                    className={styles.invitationTable}
                    rowClassName={styles.invitationRow}
                    dataSource={rsvps}
                    rowKey="invitationId"
                    expandedRowRender={(_: Invitation) => <GuestList invitationId={_.invitationId} guests={_.guests} fetch={fetch} refresh={refresh} />}
                    pagination={false}
                >
                    <InvitationColumn title="Invite Name" dataIndex="invitationName" defaultSortOrder="ascend" />
                    <InvitationColumn title="House Number" dataIndex="address.houseNumber" />
                    <InvitationColumn title="Address" key="address" render={(_, i) => <Address address={i.address} />} />
                    <InvitationColumn title="Manage" key="manage" render={(_, i) => <Button onClick={() => this.onManageClick(i)}>Manage</Button>} />
                </InvitationTable>
                <Button type="primary" onClick={this.openToAdd}>Add Invitation</Button>
                {showModal && inviteToEdit
                    && <Modal
                        title={`${adding ? 'Add' : 'Manage'} Invitation`}
                        visible={showModal}
                        onOk={adding ? this.addInvite : this.submitInvite}
                        onCancel={this.closeModal}
                    >
                        <h3>Name</h3>
                        <Input placeholder="Name" value={inviteToEdit.invitationName} onChange={this.editInput('invitationName')} />
                        <h3>House Number (For Login)</h3>
                        <Input placeholder="House Number" value={inviteToEdit.address.houseNumber} onChange={this.editAddressInput('houseNumber')} />
                        <h3>Address</h3>
                        <Input placeholder="Street Address" value={inviteToEdit.address.streetAddress} onChange={this.editAddressInput('streetAddress')} />
                        <Input placeholder="Apt Number (Optional)" value={inviteToEdit.address.aptNumber} onChange={this.editAddressInput('aptNumber')} />
                        <Input placeholder="City" value={inviteToEdit.address.city} onChange={this.editAddressInput('city')} />
                        <Input placeholder="State" value={inviteToEdit.address.state.trim()} onChange={this.editAddressInput('state')} />
                        <Input placeholder="Zip" value={inviteToEdit.address.zip.trim()} onChange={this.editAddressInput('zip')} />
                        {!adding && <>
                            <h3>DANGER ZONE</h3>
                            <Button type="danger" onClick={this.deleteInvite(inviteToEdit.invitationId)}>Delete Invitation</Button>
                        </>}
                    </Modal>}
            </>
        )
    }
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
    invitationId: number;
    guests: Guest[];
    fetch: ApolloFetch;
}

interface GuestListState {
    showModal: boolean;
    guestToEdit: Guest | null;
    nicknamesToAdd: string[] | null;
    nicknamesToDelete: string[] | null;
    addingNickname: string;
    adding: boolean;
}

class GuestList extends React.PureComponent<GuestListProps, GuestListState> {
    state: GuestListState = {
        showModal: false,
        guestToEdit: null,
        nicknamesToAdd: null,
        nicknamesToDelete: null,
        addingNickname: '',
        adding: false
    };

    onManageClick = (guest: Guest) => this.setState({ showModal: true, guestToEdit: { ...guest }, nicknamesToAdd: [], nicknamesToDelete: [], addingNickname: '', adding: false });

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
            duration: 0
        });
    }

    submitGuest = async () => {
        const { guestId, firstName, lastName, givenPlusOne, whoseGuest, guestType, plusOne, status, mealChoice } = this.state.guestToEdit!;
        const { nicknamesToAdd, nicknamesToDelete } = this.state;
        let response = await this.props.fetch({
            query: `
                mutation {
                    editGuest(guestId: ${guestId}, firstName: "${firstName}", lastName: "${lastName}", plusOne: ${givenPlusOne}, owner: ${whoseGuest}, type: ${guestType}) {
                        guest { guestId }
                        ${nicknamesToAdd!.map((_, i) => `addedNickname${i}: addNickname(name: "${_}")`).join('\n')}
                        ${nicknamesToDelete!.map((_, i) => `deletedNickname${i}: removeNickname(name: "${_}")`).join('\n')}
                    }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        const existingGuest = this.props.guests.find(_ => _.guestId === guestId)!;
        if (existingGuest.status !== status) {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setRsvpStatus(guestId: ${guestId}, status: ${status}) { guestId }
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        if (existingGuest.mealChoice !== mealChoice) {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setMealChoice(guestId: ${guestId}, choice: ${mealChoice}) { guestId }
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        if (plusOne) {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setPlusOneStatus(guestId: ${guestId}, taking: ${plusOne.taken}, firstName: ${plusOne.firstName ? `"${plusOne.firstName}"` : 'null'}, lastName: ${plusOne.lastName ? `"${plusOne.lastName}"` : 'null'}, mealChoice: ${plusOne.mealChoice || 'null'}) { guestId }
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
            ...this.state.guestToEdit!,
            [key]: event.currentTarget.value
        }
    });

    editGuestSelect = (key: keyof Guest) => (value: SelectValue) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit!,
            [key]: value as string
        }
    });

    getNicknames = () => [...this.state.guestToEdit!.nicknames.filter(_ => !this.state.nicknamesToDelete!.includes(_)), ...this.state.nicknamesToAdd!];

    removeNickname = (name: string) => () => {
        if (this.state.nicknamesToAdd!.includes(name))
            this.setState({ nicknamesToAdd: this.state.nicknamesToAdd!.filter(_ => _ !== name) });
        else if (this.state.guestToEdit!.nicknames.includes(name))
            this.setState({ nicknamesToDelete: [...this.state.nicknamesToDelete!, name] });
    }

    addNickname = () => {
        const name = this.state.addingNickname;
        if (this.state.nicknamesToDelete!.includes(name))
            this.setState({ nicknamesToDelete: this.state.nicknamesToDelete!.filter(_ => _ !== name), addingNickname: '' });
        else if (!this.state.guestToEdit!.nicknames.includes(name) && !this.state.nicknamesToAdd!.includes(name))
            this.setState({ nicknamesToAdd: [...this.state.nicknamesToAdd!, name], addingNickname: '' });
        else
            this.setState({ addingNickname: '' });
    }

    setGivenPlusOne = (event: CheckboxChangeEvent) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit!,
            givenPlusOne: event.target.checked,
            plusOne: this.state.guestToEdit!.plusOne || { taken: false, firstName: null, lastName: null, mealChoice: null }
        }
    });

    editPlusOneCheckbox = (key: keyof PlusOne) => (event: CheckboxChangeEvent) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit!,
            plusOne: {
                ...this.state.guestToEdit!.plusOne!,
                [key]: event.target.checked
            }
        }
    });

    editPlusOneInput = (key: keyof PlusOne) => (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit!,
            plusOne: {
                ...this.state.guestToEdit!.plusOne!,
                [key]: event.currentTarget.value
            }
        }
    });

    editPlusOneSelect = (key: keyof PlusOne) => (value: SelectValue) => this.setState({
        guestToEdit: {
            ...this.state.guestToEdit!,
            plusOne: {
                ...this.state.guestToEdit!.plusOne!,
                [key]: value as string
            }
        }
    });

    deleteGuest = (guestId: number) => async () => {
        const response = await this.props.fetch({
            query: `
                mutation {
                    deleteGuest(guestId: ${guestId}) { guestId }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        this.closeModal();
        this.props.refresh();
    }

    getNewGuest = (): Guest => ({
        guestId: -1,
        firstName: '',
        lastName: '',
        status: 'NO_RSVP',
        whoseGuest: 'BRIDE',
        guestType: 'FAMILY',
        givenPlusOne: false,
        plusOne: null,
        mealChoice: 'NO_MEAL',
        nicknames: [],
        lastUpdatedByGuestTimestamp: '',
        lastUpdatedByAdminTimestamp: ''
    });

    openToAdd = () => this.setState({ showModal: true, guestToEdit: this.getNewGuest(), nicknamesToAdd: [], nicknamesToDelete: [], addingNickname: '', adding: true });

    addGuest = async () => {
        const { firstName, lastName, givenPlusOne, whoseGuest, guestType, plusOne, status, mealChoice } = this.state.guestToEdit!;
        const { nicknamesToAdd } = this.state;
        let response = await this.props.fetch({
            query: `
                mutation {
                    guest: addGuest(invitationId: ${this.props.invitationId}, firstName: "${firstName}", lastName: "${lastName}", plusOne: ${givenPlusOne}, owner: ${whoseGuest}, type: ${guestType}) {
                        guest { guestId }
                        ${nicknamesToAdd!.map((_, i) => `addedNickname${i}: addNickname(name: "${_}")`)}
                    }
                }
            `
        });
        if (response.errors) return this.handleError(response.errors);
        const guestId = response.data.guest.guest.guestId;
        if (status !== 'NO_RSVP') {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setRsvpStatus(guestId: ${guestId}, status: ${status}) { guestId }
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        if (mealChoice !== 'NO_MEAL') {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setMealChoice(guestId: ${guestId}, choice: ${mealChoice}) { guestId }
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        if (plusOne) {
            response = await this.props.fetch({
                query: `
                    mutation {
                        setPlusOneStatus(guestId: ${guestId}, taking: ${plusOne.taken}, firstName: ${plusOne.firstName ? `"${plusOne.firstName}"` : 'null'}, lastName: ${plusOne.lastName ? `"${plusOne.lastName}"` : 'null'}, mealChoice: ${plusOne.mealChoice || 'null'}) { guestId }
                    }
                `
            });
            if (response.errors) return this.handleError(response.errors);
        }
        this.closeModal();
        this.props.refresh();
    }

    render() {
        const { guests } = this.props;
        const { showModal, guestToEdit, adding } = this.state;

        return (
            <>
                <GuestTable dataSource={guests} rowKey="guestId" pagination={false}>
                    <GuestColumn title="First Name" dataIndex="firstName" />
                    <GuestColumn title="Last Name" dataIndex="lastName" />
                    <GuestColumn title="Status" dataIndex="status" />
                    <GuestColumn title="Manage" key="manage" render={(_, g) => <Button onClick={() => this.onManageClick(g)}>Manage</Button>} />
                </GuestTable>
                <Button type="primary" onClick={this.openToAdd}>Add Guest</Button>
                {showModal && guestToEdit
                    && <Modal
                        title={`${adding ? 'Add' : 'Manage'} Guest`}
                        visible={showModal}
                        onOk={adding ? this.addGuest : this.submitGuest}
                        onCancel={this.closeModal}
                    >
                        {!adding && <>
                            <h3>Last Updated By Guest</h3>
                            <h4>{guestToEdit.lastUpdatedByGuestTimestamp || 'never'}</h4>
                            <h3>Last Updated By Admin</h3>
                            <h4>{guestToEdit.lastUpdatedByAdminTimestamp || 'never'}</h4>
                        </>}
                        <h3>Name</h3>
                        <Input placeholder="First Name" value={guestToEdit.firstName} onChange={this.editGuestInput('firstName')} />
                        <Input placeholder="Last Name" value={guestToEdit.lastName} onChange={this.editGuestInput('lastName')} />
                        <h3>Status</h3>
                        <Select value={guestToEdit.status} onChange={this.editGuestSelect('status')}>
                            <Select.Option value="NO_RSVP">No RSVP</Select.Option>
                            <Select.Option value="ATTENDING">Attending</Select.Option>
                            <Select.Option value="NOT_ATTENDING">Not attending</Select.Option>
                        </Select>
                        <h3>Meal Choice</h3>
                        <Select value={guestToEdit.mealChoice} onChange={this.editGuestSelect('mealChoice')}>
                            <Select.Option value="NO_MEAL">No meal</Select.Option>
                            <Select.Option value="BEEF">Beef short rib</Select.Option>
                            <Select.Option value="CHICKEN">Chicken</Select.Option>
                            <Select.Option value="SALMON">Salmon</Select.Option>
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
                            renderItem={(_: string) => <List.Item>{_}<Button onClick={this.removeNickname(_)}>Remove</Button></List.Item>}
                        />
                        <Input placeholder="Add nickname" value={this.state.addingNickname} onChange={_ => this.setState({ addingNickname: _.currentTarget.value })} />
                        <Button onClick={this.addNickname}>Add</Button>
                        <h3>Plus One</h3>
                        <Checkbox checked={guestToEdit.givenPlusOne} onChange={this.setGivenPlusOne}>Given Plus One?</Checkbox>
                        {guestToEdit.givenPlusOne && guestToEdit.plusOne && <>
                            <Checkbox checked={guestToEdit.plusOne.taken} onChange={this.editPlusOneCheckbox('taken')}>Taking?</Checkbox>
                            {guestToEdit.plusOne.taken && <>
                                <Input placeholder="First name" value={guestToEdit.plusOne.firstName} onChange={this.editPlusOneInput('firstName')} />
                                <Input placeholder="Last name" value={guestToEdit.plusOne.lastName} onChange={this.editPlusOneInput('lastName')} />
                                <Select value={guestToEdit.plusOne.mealChoice || 'NO_MEAL'} onChange={this.editPlusOneSelect('mealChoice')}>
                                    <Select.Option value="NO_MEAL">No meal</Select.Option>
                                    <Select.Option value="BEEF">Beef short rib</Select.Option>
                                    <Select.Option value="CHICKEN">Chicken</Select.Option>
                                    <Select.Option value="SALMON">Salmon</Select.Option>
                                </Select>
                            </>}
                        </>}
                        {!adding && <>
                            <h3>DANGER ZONE</h3>
                            <Button type="danger" onClick={this.deleteGuest(guestToEdit.guestId)}>Delete Guest</Button>
                        </>}
                    </Modal>}
            </>
        )
    }
}
