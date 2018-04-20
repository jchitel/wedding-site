import React from 'react';
import { ApolloFetch } from 'apollo-fetch';
import { notification, Button, Spin, Radio, Checkbox, Input } from 'antd';
import styles from '../rsvp.less';


interface ManageRsvpProps {
    fetch: ApolloFetch;
    invitationId: number;
    onLogout: () => void;
}

interface PlusOne {
    taken: boolean;
    firstName: string | null;
    lastName: string | null;
}

interface Guest {
    guestId: number;
    firstName: string;
    lastName: string;
    status: string;
    givenPlusOne: boolean;
    plusOne: PlusOne | null;
}

interface ManageRsvpState {
    loading: boolean;
    error: boolean;
    invitationName: string;
    addressLine1: string;
    addressLine2: string;
    guests: Guest[];
}

export default class ManageRsvp extends React.PureComponent<ManageRsvpProps, ManageRsvpState> {
    state: ManageRsvpState = { loading: true, error: false, invitationName: '', addressLine1: '', addressLine2: '', guests: [] };

    async componentDidMount() {
        const response = await this.props.fetch({
            query: `
                query {
                    rsvp {
                        invitationName
                        address {
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
                            status
                            givenPlusOne
                            plusOne {
                                taken
                                firstName
                                lastName
                            }
                        }
                    }
                }
            `
        });
        if (response.errors) return this.handleError();
        const rsvp = response.data.rsvp;
        this.setState({
            loading: false,
            invitationName: rsvp.invitationName,
            addressLine1: !rsvp.address.aptNumber ? rsvp.address.streetAddress : `${rsvp.address.streetAddress} ${rsvp.address.aptNumber}`,
            addressLine2: `${rsvp.address.city}, ${rsvp.address.state} ${rsvp.address.zip}`,
            guests: rsvp.guests
        })
    }

    handleError = () => {
        notification.error({
            message: 'Error',
            description: 'Something went wrong. Please wait and try again or contact jchitel@gmail.com',
            duration: 0
        });
        this.setState({ loading: false, error: true });
    }

    retry = async () => {
        this.setState({ loading: true, error: false });
        await this.componentDidMount();
    }

    onGuestChange = (guestId: number) => (guest: Guest) => this.setState({
        guests: this.state.guests.map(_ => _.guestId === guestId ? guest : _)
    })

    submit = async () => {
        const response = await this.props.fetch({
            query: `
                mutation {
                    ${this.state.guests.map((_, i) => `
                        guestRsvp${i}: setRsvpStatus(guestId: ${_.guestId}, status: ${_.status}) { guestId }
                        ${!_.givenPlusOne ? '' : `guestPlusOne${i}: setPlusOneStatus(guestId: ${_.guestId}, taking: ${_.plusOne!.taken}, firstName: "${_.plusOne!.firstName}", lastName: "${_.plusOne!.lastName}") { guestId }`}
                    `)}
                }
            `
        });
        if (response.errors) return this.handleError();
        this.props.onLogout();
        notification.success({
            message: 'Success',
            description: 'Thank you for RSVP-ing!',
            duration: 5
        });
    }

    render() {
        const { loading, error, invitationName, addressLine1, addressLine2, guests } = this.state;

        if (error) return <Button type="primary" onClick={this.retry}>Retry</Button>;
        if (loading) return <Spin />;

        const anyPlusOnes = guests.some(_ => _.givenPlusOne);

        return <>
            <span className={styles.subHeader}>{invitationName}</span>
            <span className={styles.address}>{addressLine1}</span>
            <span className={styles.address}>{addressLine2}</span>
            <br />
            <span className={styles.subHeader}>Guests</span>
            <p className={styles.loginExplanation}>
                Below is each guest on your invitation. Please select for each guest whether or not
                he or she will be attending. {anyPlusOnes && 'If you were given a plus one, please select '
                + 'whether you will be bringing a plus one, and if so, the first and last name of that person.'} Press <b>submit</b> to
                submit the information. If anything you see is incorrect, or there is any problem entering this information, please
                contact jchitel@gmail.com.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {guests.map(g => <GuestEntry key={g.guestId} guest={g} onChange={this.onGuestChange(g.guestId)} />)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={this.submit}>Submit</Button>
            </div>
        </>;
    }
}

function GuestEntry({ guest, onChange }: { guest: Guest, onChange: (guest: Guest) => void }) {
    return <div style={{ width: 250, marginBottom: 30 }}>
        <span className={styles.address} style={{ marginBottom: 10 }}>{guest.firstName} {guest.lastName}</span>
        <span className={styles.center}>Coming?</span>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio.Group onChange={_ => onChange({ ...guest, status: _.target.value })} value={guest.status}>
                <Radio.Button value="ATTENDING">YES</Radio.Button>
                <Radio.Button value="NOT_ATTENDING">NO</Radio.Button>
            </Radio.Group>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {guest.givenPlusOne && guest.plusOne
                && <Checkbox checked={guest.plusOne.taken} onChange={_ => onChange({ ...guest, plusOne: { ...guest.plusOne!, taken: _.target.checked } })}>Taking Plus One?</Checkbox>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {guest.givenPlusOne && guest.plusOne && guest.plusOne.taken
                && <>
                    <Input className={styles.plusOneInput} value={guest.plusOne.firstName} onChange={_ => onChange({ ...guest, plusOne: { ...guest.plusOne!, firstName: _.currentTarget.value } })} placeholder="First Name" />
                    <Input className={styles.plusOneInput} value={guest.plusOne.lastName} onChange={_ => onChange({ ...guest, plusOne: { ...guest.plusOne!, lastName: _.currentTarget.value } })} placeholder="Last Name" />
                </>}
        </div>
    </div>
}
