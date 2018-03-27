/*Error.stackTraceLimit = Infinity;
import * as tsNode from 'ts-node';
// register ts-node
tsNode.register({ project: `${__dirname}/tsconfig.json` });

import serverless from 'serverless-http';
import app from './server';


/** export lambda hander wrapped around koa app * /
export const handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: true
});*/

export const handler = (event: any, context: any, callback: any) => {
    Error.stackTraceLimit = Infinity;
    const tsNode = require('ts-node');
    // register ts-node
    tsNode.register({ project: `${__dirname}/tsconfig.json`, ignore: /\/node_modules\/(?!koa-mount)/ });

    const serverless = require('serverless-http').default;
    const app = require('./server').default;


    /** export lambda hander wrapped around koa app */
    const _handler = serverless(app, {
        callbackWaitsForEmptyEventLoop: true
    });
    _handler(event, context, callback);
}
