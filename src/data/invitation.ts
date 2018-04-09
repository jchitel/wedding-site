import SqlClient from './sql-client';

export interface Invitation {
    invitationId: number;
    invitationName: string;
    address: Address;
}

export interface Address {
    houseNumber: string;
    streetAddress: string;
    aptNumber: string | null;
    city: string;
    state: string;
    zip: string;
}

export default class InvitationClient {
    constructor(private sqlClient: SqlClient) {}

    async queryAll(): Promise<Invitation[]> {
        const { rows } = await this.sqlClient.query(`
            select i.invitation_id,
                   i.invitation_name,
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

    async queryById(id: number): Promise<Invitation | null> {
        const { rows: [row] } = await this.sqlClient.query(`
            select i.invitation_id,
                   i.invitation_name,
                   i.house_number,
                   i.street_address,
                   i.apt_number,
                   i.city,
                   i.state,
                   i.zip
            from invitation i
            where i.invitation_id = $1
        `, [id]);
        return row ? this.dbToBo(row) : null;
    }

    async queryByNameAndHouseNumber(name: string, houseNumber: string): Promise<Invitation[]> {
        // match the house number against the invitation record,
        // and the name against any of the names for any guest on the invitation
        const { rows } = await this.sqlClient.query(`
            select distinct on (i.invitation_id)
                   i.invitation_id,
                   i.invitation_name,
                   i.house_number,
                   i.street_address,
                   i.apt_number,
                   i.city,
                   i.state,
                   i.zip
            from invitation i
            join guest g on i.invitation_id = g.invitation_id
            join guest_name gn on g.guest_id = gn.guest_id
            where i.house_number = $2
              and gn.search_name = $1
        `, [name.toLowerCase().trim(), houseNumber]);
        return rows.map(this.dbToBo);
    }

    private readonly dbToBo = (_: any): Invitation => ({
        invitationId: _.invitation_id,
        invitationName: _.invitation_name,
        address: {
            houseNumber: _.house_number,
            streetAddress: _.street_address,
            aptNumber: _.apt_number || null,
            city: _.city,
            state: _.state,
            zip: _.zip
        }
    });
}
