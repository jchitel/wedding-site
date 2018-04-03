import webpack from 'webpack';
import app from '../src/server';
import config from '../webpack.config';


// run webpack
const compiler = webpack({ ...config, mode: 'development', context: process.cwd() });
compiler.run((err, stats) => err ? console.error(err) : console.log('Compiled successfully'));

// start koa server
app.listen(1235, () => console.log('Server started'));
