Error.stackTraceLimit = Infinity;
import * as tsNode from 'ts-node';
// register ts-node
tsNode.register({ project: `${__dirname}/tsconfig.json`, skipIgnore: true } as any);

import serverless from 'serverless-http';
import app from './server';


/** export lambda hander wrapped around koa app */
export const handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: true
});
