import { Pool, PoolClient, QueryResult } from 'pg';


export const createPool = () => new Pool({
    host: 'wedding-rsvp.c7d1sa7pwmlq.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'wedding_rsvp',
    user: 'jake',
    password: process.env.JWT_SECRET
});

/**
 * Container for a PostgreSQL client.
 * It has the capability of running either a single query
 * or a transaction, and is meant to be a bare minimum abstraction
 * layer with no domain logic.
 * Only one of these should be created per server initialization,
 * so that the connection pool can be reused.
 */
export default class SqlClient {
    constructor(private pool: Pool) {}

    async query(query: string, values?: any[]) {
        const client = await this.pool.connect();
        try {
            return client.query(query, values);
        } finally {
            client.release();
        }
    }

    async transaction(fn: (client: PoolClient) => Promise<QueryResult>): Promise<QueryResult> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const value = await fn(client);
            await client.query('COMMIT');
            return value;
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
}
