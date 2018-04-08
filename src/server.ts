import express from 'express';
import path from 'path';
import graphqlHttp from 'express-graphql';
import schema, { IWeddingSiteContext } from './graphql/schema';
import SqlClient, { createPool } from './data/sql-client';


const app = express();

// static files
const parts = process.env.SERVER_ENV === 'lambda'
    ? [__dirname, 'bundle']
    : [__dirname, '..', 'build', 'bundle'];
app.use(express.static(path.resolve(...parts)));

let _client: SqlClient;
const getClient = () => _client || (_client = new SqlClient(createPool()));

// graphql endpoint
app.use('/graphql', graphqlHttp(request => {
    const token = ((/Bearer (\S+)/i).exec(request.get('authorization') || '') || [])[1] || '';

    return {
        schema,
        graphiql: process.env.SERVER_ENV === 'local',
        context: {
            token,
            client: getClient()
        } as IWeddingSiteContext
    };
}))

export default app;
