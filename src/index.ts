console.log('HELLO THERE');
Error.stackTraceLimit = Infinity;
console.log('HELLO THERE 1');
import * as tsNode from 'ts-node';
console.log('HELLO THERE 2');
// register ts-node
tsNode.register({ compilerOptions: { allowJs: true, target: 'es2015' } });
console.log('HELLO THERE 3');

import serverless from 'serverless-http';
console.log('HELLO THERE 4');
import app from './server';
console.log('HELLO THERE 5');


/** export lambda hander wrapped around koa app */
export const handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: true
});
console.log('HELLO THERE 6');
