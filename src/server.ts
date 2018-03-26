import Koa = require('koa');
import mount = require('koa-mount');
import _ = require('koa-route');
import serve = require('koa-static');
import path = require('path');
import renderApp from './render';


const app = new Koa();

// / -> app html
app.use(_.get('/', ctx => {
    ctx.body = renderApp()
}));

// /favicon.ico -> static favicon
app.use(_.get('/favicon.ico', serve(path.join(__dirname, 'site/images/favicon.ico'))));

// /bundle -> bundle files
app.use(mount('/bundle', serve(path.join(__dirname, '..', 'build/bundle'))));

// /images -> images
app.use(mount('/images', serve(path.join(__dirname, 'site/images'))));

export default app;
