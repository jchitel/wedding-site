import express from 'express';
import path from 'path';


const app = express();

// request logging
app.use((req, _res, next) => {
    console.log(`
${req.method.toUpperCase()} ${req.path} HTTP/1.1
${req.rawHeaders.reduce((str, _, i) => i % 2 === 0 ? `${str}${_}` : `${str}: ${_}\n`, '')}
${req.body}`
    );
    next();
});

// in lambda, the __dirname will be /var/task.
const isLambda = __dirname === '/var/task';
// static files
const parts = isLambda ? [__dirname, 'bundle'] : [__dirname, '..', 'build', 'bundle'];
app.use(express.static(path.resolve(...parts)));

export default app;
