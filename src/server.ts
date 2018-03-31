import Koa = require('koa');
import mount = require('koa-mount');
import _ = require('koa-route');
import serve = require('koa-static');
import send = require('koa-send');
import path = require('path');


const app = new Koa();

// / -> app html
app.use(_.get('/', ctx => send(ctx, 'build/bundle/index.html')));

// static files
app.use(_.get('/favicon.ico', ctx => send(ctx, path.join(__dirname, 'site/images/favicon.ico'))));
app.use(mount('/bundle', serve(path.join(__dirname, '..', 'build/bundle'))));

export default app;
