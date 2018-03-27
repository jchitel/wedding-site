import Koa = require('koa');
import mount = require('koa-mount');
import _ = require('koa-route');
import serve = require('koa-static');
import send = require('koa-send');
import path = require('path');
import renderApp from './render';


const app = new Koa();

// / -> app html
app.use(_.get('/', ctx => {
    ctx.body = renderApp()
}));

// static files
app.use(_.get('/favicon.ico', ctx => send(ctx, path.join(__dirname, 'site/images/favicon.ico'))));
app.use(_.get('/bundle/index.js', ctx => send(ctx, path.join(__dirname, '..', 'build/bundle/index.js'))));
app.use(_.get('/bundle/index.css', ctx => send(ctx, path.join(__dirname, '..', 'build/bundle/index.js'))));

// /images -> images
app.use(mount('/images', serve(path.join(__dirname, 'site/images'))));

export default app;
