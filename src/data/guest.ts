import SqlClient from './sql-client';


export type GuestStatus = 'no_rsvp' | 'attending' | 'not_attending';
export type GuestOwner = 'bride' | 'groom';
export type GuestType = 'family' | 'family_friend' | 'friend' | 'party';

export interface Guest {
    guestId: number;
    firstName: string;
    lastName: string;
    status: GuestStatus;
    givenPlusOne: boolean;
    plusOne: PlusOne | null;
    whoseGuest: GuestOwner;
    guestType: GuestType;
    lastUpdatedByGuest: string;
    lastUpdatedByGuestTimestamp: string;
    lastUpdatedByAdminTimestamp: string;
}

export interface PlusOne {
    taken: boolean;
    firstName: string | null;
    lastName: string | null;
}

export default class GuestClient {
    constructor(private sqlClient: SqlClient) {}

    async queryByInvitationId(invitationId: number) {
        const { rows } = await this.sqlClient.query(`
            select g.guest_id,
                   fn.display_name as first_name,
                   ln.display_name as last_name,
                   g.status,
                   exists(p.plus_one_id) as given_plus_one,
                   p.taken as plus_one_taken,
                   p.first_name as plus_one_first_name,
                   p.last_name as plus_one_last_name,
                   g.owner,
                   g.type,
                   g.last_updated_by_guest,
                   g.last_updated_by_guest_timestamp,
                   g.last_updated_by_admin_timestamp
            from guest g
                 join guest_name fn on g.guest_id = fn.guest_id and fn.guest_name_type = 'given_name'
                 join guest_name ln on g.guest_id = ln.guest_id and ln.guest_name_type = 'last_name'
                 left join plus_one p on p.guest_id = g.guest_id
            where g.invitation_id = $1
        `, [invitationId]);
        return rows.map(this.dbToBo);
    }

    private readonly dbToBo = (_: any): Guest => ({
        guestId: _.guest_id,
        firstName: _.first_name,
        lastName: _.last_name,
        status: _.status,
        givenPlusOne: _.given_plus_one,
        plusOne: !_.given_plus_one ? null : {
            taken: _.plus_one_taken,
            firstName: _.plus_one_first_name || null,
            lastName: _.plus_one_last_name || null
        },
        whoseGuest: _.owner,
        guestType: _.type,
        lastUpdatedByGuest: _.last_updated_by_guest,
        lastUpdatedByGuestTimestamp: _.last_updated_by_guest_timestamp,
        lastUpdatedByAdminTimestamp: _.last_updated_by_admin_timestamp
    })
}
