process.env.SERVER_ENV = 'local';
import app from '../src/server';


process.env.JWT_SECRET = process.env.WEDDING_SITE_JWT_SECRET;

// start koa server
app.listen(1235, () => console.log('Server started'));
