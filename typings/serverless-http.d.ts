declare module 'serverless-http' {
    import { IncomingMessage, ServerResponse } from 'http';
    import { APIGatewayProxyEvent, Context, APIGatewayProxyHandler } from 'aws-lambda';

    function serverless(app: serverless.App, options?: serverless.Options): APIGatewayProxyHandler;

    namespace serverless {
        type KoaApp = { callback(): Handler; }
        type ExpressApp = { handle: Handler; }

        type Headers = { [name: string]: string };

        /**
         * A generic HTTP handler for a Node server, receiving a request (http.IncomingMessage)
         * and a response (http.ServerResponse)
         */
        export type Handler = (request: IncomingMessage, response: ServerResponse) => void;

        /**
         * App type supported by serverless-http:
         * - Koa app instance
         * - Express app instance
         * - Generic handler function
         */
        export type App = KoaApp | ExpressApp | Handler;

        /**
         * A transform function or object for a request or response.
         * If a function, it will be passed the request or response,
         * the lambda event, and the lambda context. If an object,
         * it should be a set of properties to apply to the request
         * or response.
         */
        export type Transform<T extends IncomingMessage | ServerResponse>
            = (item: T, event: APIGatewayProxyEvent, context: Context) => T
            | Partial<T>;

        /**
         * Optional set of options to pass to serverless()
         */
        export interface Options {
            /** Forwarded to the lambda context's corresponding property */
            callbackWaitsForEmptyEventLoop?: boolean;
            /** Header to use for the AWS request ID */
            requestId?: string;
            /** An optional transform for the request instance */
            request?: Transform<IncomingMessage>;
            /** An optional transform for the response instance */
            response?: Transform<ServerResponse>;
            /**
             * Controls API Gateway binary support:
             * - a straight boolean is a global control
             * - a function will allow you to control the support based on the request headers
             * - an array of strings will control based on a set of content types
             */
            binary?: boolean | ((headers: Headers) => boolean) | string[];
        }
    }
    export = serverless;
}
