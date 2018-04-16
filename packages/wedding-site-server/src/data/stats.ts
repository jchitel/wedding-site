import SqlClient from './sql-client';
import { GuestOwner, GuestType, GuestStatus } from './guest';

export default class StatsClient {
    constructor(private sqlClient: SqlClient) {}

    async queryGuestRsvpStats(owner: GuestOwner | undefined, type: GuestType | undefined, plusOnes: boolean | undefined) {
        const invited = await this.querySingleGuestRsvpStat(undefined, owner, type);
        const attending = await this.querySingleGuestRsvpStat('attending', owner, type);
        const notAttending = await this.querySingleGuestRsvpStat('not_attending', owner, type);
        return {
            numInvited: !plusOnes ? invited : (invited + await this.querySinglePlusOneRsvpStat(undefined, owner, type)),
            numAttending: !plusOnes ? attending : (attending + await this.querySinglePlusOneRsvpStat('attending', owner, type)),
            numNotAttending: !plusOnes ? notAttending : (notAttending + await this.querySinglePlusOneRsvpStat('not_attending', owner, type))
        };
    }

    async queryInvitationStats() {
        const { rows: [{ num: total }] } = await this.sqlClient.query('select count(*) as num from invitations');
        const { rows: [{ num: responded }] } = await this.sqlClient.query(`
            select count(distinct i.invitation_id) as num
            from invitation i
            join guest g on i.invitation_id = g.guest_id
            where g.status <> 'no_rsvp'
        `);
        return { numInvitations: total as number, numInvitationsResponded: responded as number };
    }

    private async querySingleGuestRsvpStat(
        status: GuestStatus | undefined,
        owner: GuestOwner | undefined,
        type: GuestType | undefined
    ) {
        const { rows } = await this.sqlClient.query(`
            select count(*) as num
            from guest
            where (status = $1 or $1 is null)
              and (owner = $2 or $2 is null)
              and (type = $3 or $3 is null)
        `, [status || null, owner || null, type || null]);
        return rows[0].num as number;
    }

    /**
     * TODO: this apparently needs work
     */
    private async querySinglePlusOneRsvpStat(
        status: GuestStatus | undefined,
        owner: GuestOwner | undefined,
        type: GuestType | undefined
    ) {
        const { rows } = await this.sqlClient.query(`
            select count(*) as num
            from plus_one p
            join guest g on p.guest_id = g.guest_id
            where (g.status = $1 or $1 is null)
              and (g.owner = $2 or $2 is null)
              and (g.type = $3 or $3 is null)
        `, [status || null, owner || null, type || null]);
        return rows[0].num as number;
    }
}