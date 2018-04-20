Error.stackTraceLimit = Infinity;
process.env.SERVER_ENV = 'lambda';
const serverless = require('aws-serverless-express');
const app = require('wedding-site-server');


/** export lambda hander wrapped around express app */
const server = serverless.createServer(app);
export async function handler(event, context) {
    context.callbackWaitsForEmptyEventLoop = true;
    console.log('Handling event:', event);
    return new Promise((resolve, reject) => {
        serverless.proxy(server, event, {
            ...context,
            succeed: (value) => {
                console.log('Response:', value);
                resolve(value);
            },
            fail: (error) => {
                console.log('Error:', error);
                reject(error);
            }
        })
    });
}
