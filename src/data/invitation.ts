import SqlClient from './sql-client';


export interface InvitationClient {
    /** Get the full list of all invitation records */
    queryAll(): Promise<Invitation[]>;
    /** Get a single invitation by id */
    queryById(id: string): Promise<Invitation>;
    /** Search for an invitation by name and house number. May return 0 or more than 1, so it returns a list */
    queryByNameAndHouseNumber(name: string, houseNumber: string): Promise<Invitation[]>;
}

export interface Invitation {
    invitationId: string;
    houseNumber: string;
    streetAddress: string;
    aptNumber: string | null;
    city: string;
    state: string;
    zip: string;
}

export interface Address {
    houseNumber: string;
    streetAddress: string;
    aptNumber: string | null;
    city: string;
    state: string;
    zip: string;
}

export class SqlInvitationClient implements InvitationClient {
    constructor(private sqlClient: SqlClient) {}

    async queryAll(): Promise<Invitation[]> {
        const { rows } = await this.sqlClient.query(`
            select i.invitation_id,
                   i.house_number,
                   i.street_address,
                   i.apt_number,
                   i.city,
                   i.state,
                   i.zip
            from invitation i
        `);
        return rows.map(this.dbToBo);
    }

    async queryById(id: string): Promise<Invitation> {
        const { rows: [row] } = await this.sqlClient.query(`
            select i.invitation_id,
                   i.house_number,
                   i.street_address,
                   i.apt_number,
                   i.city,
                   i.state,
                   i.zip
            from invitation i
            where i.invitation_id = $1
        `, [id]);
        return this.dbToBo(row);
    }

    async queryByNameAndHouseNumber(name: string, houseNumber: string): Promise<Invitation[]> {
        const { rows } = await this.sqlClient.query(`
            select distinct on (i.invitation_id)
                   i.invitation_id,
                   i.house_number,
                   i.street_address,
                   i.apt_number,
                   i.city,
                   i.state,
                   i.zip
            from invitation i
            join guest g on i.invitation_id = g.invitation_id
            where i.house_number = $2
              and (lower(g.first_name) = trim(both from lower($1))
                   or lower(g.last_name) = trim(both from lower($1))
                   or lower(g.first_name || ' ' || g.last_name) = trim(both from lower($1)))
        `, [name, houseNumber]);
        return rows.map(this.dbToBo);
    }

    private readonly dbToBo = (_: any): Invitation => ({
        invitationId: _.invitation_id,
        houseNumber: _.house_number,
        streetAddress: _.street_address,
        aptNumber: _.apt_number || null,
        city: _.city,
        state: _.state,
        zip: _.zip
    });
}
