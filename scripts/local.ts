import Bundler = require('parcel-bundler');
import app from '../src/server';


// run bundler (w/ watch and hmr)
const bundler = new Bundler('./src/site/index.tsx', { hmrPort: 1234, outDir: './build/bundle' });
bundler.bundle();

// start koa server
app.listen(1235);
