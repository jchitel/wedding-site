Error.stackTraceLimit = Infinity;
import { execSync } from 'child_process';
// install npm dependencies
execSync('npm i', { stdio: 'inherit', cwd: __dirname });
import * as tsNode from 'ts-node';
// register ts-node
tsNode.register();

import serverless from 'serverless-http';
import app from './server';


/** export lambda hander wrapped around koa app */
export const handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: true
});
