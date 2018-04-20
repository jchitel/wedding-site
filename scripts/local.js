const path = require('path');
const express = require('express');
process.env.SERVER_ENV = 'local';
const app = require('../packages/wedding-site-server/build').default;


process.env.JWT_SECRET = process.env.WEDDING_SITE_JWT_SECRET;

// graphiql page
app.use('/graphiql', express.static(path.resolve(__dirname, '..', 'packages', 'wedding-site-graphiql', 'build')));
// main site
app.use(express.static(path.resolve(__dirname, '..', 'packages', 'wedding-site-client', 'build')));

// start koa server
app.listen(1235, () => console.log('Server started'));
