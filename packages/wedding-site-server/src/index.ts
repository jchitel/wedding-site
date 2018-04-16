import express from 'express';
import path from 'path';
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
        graphiql: process.env.SERVER_ENV === 'local',
        context: {
            token,
            client: getClient()
        } as IWeddingSiteContext
    };
}));

if (process.env.SERVER_ENV === 'local') {
    // only serve static files on local, deployed static files are handled by API Gateway and S3
    const staticRoot = path.resolve(__dirname, '..', 'build');
    // graphiql page
    app.use('/graphiql', express.static(path.resolve(staticRoot, 'graphiql')));
    // static files
    app.use(express.static(path.resolve(staticRoot, 'bundle')));
}

export default app;
