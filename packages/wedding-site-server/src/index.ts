import express from 'express';
import graphqlHttp from 'express-graphql';
import schema, { IWeddingSiteContext } from './graphql/schema';
import SqlClient, { createPool } from './data/sql-client';


const app = express();

let _client: SqlClient;
const getClient = () => _client || (_client = new SqlClient(createPool()));

// graphql endpoint
app.use('/graphql', graphqlHttp(request => {
    const token = ((/Bearer (\S+)/i).exec(request.get('authorization') || '') || [])[1] || null;
    return {
        schema,
        graphiql: process.env.SERVER_ENV === 'lambda',
        context: {
            token,
            client: getClient()
        } as IWeddingSiteContext
    };
}));

export default app;
