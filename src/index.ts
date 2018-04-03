Error.stackTraceLimit = Infinity;
import serverless from 'aws-serverless-express';
import * as lambda from 'aws-lambda';
import app from './server';


/** export lambda hander wrapped around express app */
const server = serverless.createServer(app, undefined, ['image/png', 'image/jpeg', 'application/x-font-ttf']);
export const handler: lambda.APIGatewayProxyHandler = (event, context) => {
    context.callbackWaitsForEmptyEventLoop = true;
    console.log('Handling event:', event);
    serverless.proxy(server, event, {
        ...context,
        succeed: (value: any) => {
            console.log('Response:', value);
            context.succeed(value);
        }
    });
}
