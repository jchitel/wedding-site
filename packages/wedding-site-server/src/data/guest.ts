import SqlClient from './sql-client';
import { PoolClient } from 'pg';


export type GuestStatus = 'no_rsvp' | 'attending' | 'not_attending';
export type GuestOwner = 'bride' | 'groom';
export type GuestType = 'family' | 'family_friend' | 'friend' | 'party';
export type RsvpMeal = 'no_meal' | 'beef' | 'chicken' | 'salmon' | 'kids';

export interface Guest {
    guestId: number;
    firstName: string;
    lastName: string;
    status: GuestStatus;
    givenPlusOne: boolean;
    plusOne: PlusOne | null;
    mealChoice: RsvpMeal;
    whoseGuest: GuestOwner;
    guestType: GuestType;
    lastUpdatedByGuestTimestamp: string | null;
    lastUpdatedByAdminTimestamp: string;
}

export interface PlusOne {
    taken: boolean;
    firstName: string | null;
    lastName: string | null;
    mealChoice: RsvpMeal | null;
}

export default class GuestClient {
    constructor(private sqlClient: SqlClient) {}

    async queryByInvitationId(invitationId: number) {
        const { rows } = await this.sqlClient.query(`
            select g.guest_id,
                   fn.display_name as first_name,
                   ln.display_name as last_name,
                   g.status,
                   (case when p.plus_one_id is null then false else true end) as given_plus_one,
                   p.taken as plus_one_taken,
                   p.first_name as plus_one_first_name,
                   p.last_name as plus_one_last_name,
                   p.meal_choice as plus_one_meal_choice,
                   g.meal_choice,
                   g.owner,
                   g.type,
                   g.last_updated_by_guest_timestamp,
                   g.last_updated_by_admin_timestamp
            from guest g
                 join guest_name fn on g.guest_id = fn.guest_id and fn.type = 'given_name'
                 join guest_name ln on g.guest_id = ln.guest_id and ln.type = 'last_name'
                 left join plus_one p on p.guest_id = g.guest_id
            where g.invitation_id = $1
        `, [invitationId]);
        return rows.map(this.dbToBo);
    }

    async queryGuestNicknames(guestId: number) {
        const { rows } = await this.sqlClient.query(`
            select n.display_name as nickname
            from guest_name n
            where n.guest_id = $1
              and n.type = 'nickname'
        `, [guestId]);
        return rows.map(_ => _.nickname as string);
    }

    async updateRsvpStatusAdmin(guestId: number, status: GuestStatus) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update status
            await client.query(`
                update guest
                set status = $2,
                    last_updated_by_admin_timestamp = $3
                where guest_id = $1
            `, [guestId, status, new Date()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async updateRsvpStatusGuest(guestId: number, status: GuestStatus) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update status
            await client.query(`
                update guest
                set status = $2,
                    last_updated_by_guest_timestamp = $3
                where guest_id = $1
            `, [guestId, status, new Date()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async updateMealChoiceAdmin(guestId: number, choice: RsvpMeal) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update status
            await client.query(`
                update guest
                set meal_choice = $2,
                    last_updated_by_admin_timestamp = $3
                where guest_id = $1
            `, [guestId, choice, new Date()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async updateMealChoiceGuest(guestId: number, choice: GuestStatus) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update status
            await client.query(`
                update guest
                set meal_choice = $2,
                    last_updated_by_guest_timestamp = $3
                where guest_id = $1
            `, [guestId, choice, new Date()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async updatePlusOneStatusAdmin(guestId: number, taking: boolean, firstName: string | undefined, lastName: string | undefined, mealChoice: RsvpMeal | undefined) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update plus one
            await client.query(`
                update plus_one set
                    taken = $2,
                    first_name = $3,
                    last_name = $4,
                    meal_choice = $5
                where guest_id = $1
            `, [guestId, taking, firstName || null, lastName || null, mealChoice || null]);
            // update guest timestamp
            await client.query(`
                update guest
                set last_updated_by_admin_timestamp = $2
                where guest_id = $1
            `, [guestId, new Date()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async updatePlusOneStatusGuest(guestId: number, taking: boolean, firstName: string | undefined, lastName: string | undefined, mealChoice: RsvpMeal | undefined) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update plus one
            await client.query(`
                update plus_one set
                    taken = $2,
                    first_name = $3,
                    last_name = $4,
                    meal_choice = $5
                where guest_id = $1
            `, [guestId, taking, firstName || null, lastName || null, mealChoice || null]);
            // update guest timestamp
            await client.query(`
                update guest set
                    last_updated_by_guest_timestamp = $2
                where guest_id = $1
            `, [guestId, new Date()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async insertGuest(invitationId: number, firstName: string, lastName: string, plusOne: boolean, owner: GuestOwner, type: GuestType) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // insert guest record
            const { rows: [{ guest_id: guestId }] } = await client.query(`
                insert into guest
                (invitation_id, status, meal_choice, owner, type, last_updated_by_admin_timestamp)
                values
                ($1, 'no_rsvp', 'no_meal', $2, $3, $4)
                returning guest_id
            `, [invitationId, owner, type, new Date()]);
            // insert plus one record
            if (plusOne) await client.query(`
                insert into plus_one
                (guest_id, taken)
                values
                ($1, false)
            `, [guestId]);
            const [_firstName, _lastName] = [firstName.trim(), lastName.trim()];
            const fullName = `${_firstName} ${_lastName}`;
            // insert name records
            await client.query(`
                insert into guest_name
                (guest_id, display_name, search_name, type)
                values
                ($1, $2, $3, 'given_name'),
                ($1, $4, $5, 'last_name'),
                ($1, $6, $7, 'full_name')
            `, [guestId, _firstName, _firstName.toLowerCase(), _lastName, _lastName.toLowerCase(), fullName, fullName.toLowerCase()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async updateGuest(guestId: number, firstName: string, lastName: string, plusOne: boolean, owner: GuestOwner, type: GuestType) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // update guest record
            await client.query(`
                update guest set
                    owner = coalesce($2, owner),
                    type = coalesce($3, type),
                    last_updated_by_admin_timestamp = $4
                where guest_id = $1
            `, [guestId, owner, type, new Date()]);
            // query existing guest record
            const { rows: [_existing] } = await this._byGuestId(client, guestId);
            const existing = this.dbToBo(_existing);
            // update guest (if applicable)
            if (existing.givenPlusOne && !plusOne) {
                await client.query(`
                    delete from plus_one
                    where guest_id = $1
                `, [guestId]);
            } else if (!existing.givenPlusOne && plusOne) {
                await client.query(`
                    insert into plus_one
                    (guest_id, taken)
                    values
                    ($1, false)
                `, [guestId]);
            }
            const [_firstName, _lastName] = [firstName ? firstName.trim() : existing.firstName, lastName ? lastName.trim() : existing.lastName];
            const fullName = `${_firstName} ${_lastName}`;
            // update first name
            await client.query(`
                update guest_name
                set display_name = $2,
                    search_name = $3
                where guest_id = $1 and type = 'given_name'
            `, [guestId, _firstName, _firstName.toLowerCase()]);
            // update last name
            await client.query(`
                update guest_name
                set display_name = $2,
                    search_name = $3
                where guest_id = $1 and type = 'last_name'
            `, [guestId, _lastName, _lastName.toLowerCase()]);
            // update full name
            await client.query(`
                update guest_name
                set display_name = $2,
                    search_name = $3
                where guest_id = $1 and type = 'full_name'
            `, [guestId, fullName, fullName.toLowerCase()]);
            // query guest
            return this._byGuestId(client, guestId);
        });
        return this.dbToBo(rows[0]);
    }

    async deleteGuest(guestId: number) {
        const { rows } = await this.sqlClient.transaction(async client => {
            // query existing guest before deletion
            const result = await this._byGuestId(client, guestId);
            // delete plus one record
            await client.query(`
                delete from plus_one
                where guest_id = $1
            `, [guestId]);
            // delete name records
            await client.query(`
                delete from guest_name
                where guest_id = $1
            `, [guestId]);
            // delete guest record
            await client.query(`
                delete from guest
                where guest_id = $1
            `, [guestId]);
            // return existing guest
            return result;
        });
        return this.dbToBo(rows[0]);
    }

    async insertNickname(guestId: number, name: string) {
        const _name = name.trim();
        await this.sqlClient.query(`
            insert into guest_name
            (guest_id, display_name, search_name, type)
            values
            ($1, $2, $3, 'nickname')
        `, [guestId, _name, _name.toLowerCase()]);
    }

    async deleteNickname(guestId: number, name: string) {
        await this.sqlClient.query(`
            delete from guest_name
            where guest_id = $1 and search_name = $2
        `, [guestId, name.trim().toLowerCase()]);
    }

    private async _byGuestId(client: PoolClient, guestId: number) {
        return client.query(`
            select g.guest_id,
                fn.display_name as first_name,
                ln.display_name as last_name,
                g.status,
                (case when p.plus_one_id is null then false else true end) as given_plus_one,
                p.taken as plus_one_taken,
                p.first_name as plus_one_first_name,
                p.last_name as plus_one_last_name,
                p.meal_choice as plus_one_meal_choice,
                g.meal_choice,
                g.owner,
                g.type,
                g.last_updated_by_guest_timestamp,
                g.last_updated_by_admin_timestamp
            from guest g
                join guest_name fn on g.guest_id = fn.guest_id and fn.type = 'given_name'
                join guest_name ln on g.guest_id = ln.guest_id and ln.type = 'last_name'
                left join plus_one p on p.guest_id = g.guest_id
            where g.guest_id = $1
        `, [guestId]);
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
            lastName: _.plus_one_last_name || null,
            mealChoice: _.plus_one_meal_choice || null,
        },
        mealChoice: _.meal_choice,
        whoseGuest: _.owner,
        guestType: _.type,
        lastUpdatedByGuestTimestamp: _.last_updated_by_guest_timestamp,
        lastUpdatedByAdminTimestamp: _.last_updated_by_admin_timestamp
    })
}
