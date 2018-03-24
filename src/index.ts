console.log('HELLO WORLD');
import serverless from 'serverless-http';
import app from './server';


/** export lambda hander wrapped around koa app */
export const handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: true
});
