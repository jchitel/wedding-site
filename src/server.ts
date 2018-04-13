import express from 'express';
import path from 'path';
import graphqlHttp from 'express-graphql';
import schema, { IWeddingSiteContext } from './graphql/schema';
import SqlClient, { createPool } from './data/sql-client';


const app = express();

// static files
const staticRoot = process.env.SERVER_ENV === 'lambda'
    ? __dirname
    : path.resolve(__dirname, '..', 'build');
app.use(express.static(path.resolve(staticRoot, 'bundle')));

let _client: SqlClient;
const getClient = () => _client || (_client = new SqlClient(createPool()));

// graphql endpoint
app.use('/graphql', graphqlHttp(request => {
    const token = ((/Bearer (\S+)/i).exec(request.get('authorization') || '') || [])[1] || null;

    return {
        schema,
        graphiql: process.env.SERVER_ENV === 'local',
        context: {
            token,
            client: getClient()
        } as IWeddingSiteContext
    };
}));

if (process.env.SERVER_ENV === 'local') {
    // graphiql page
    app.use('/graphiql', express.static(path.resolve(staticRoot, 'graphiql')));
}

export default app;
