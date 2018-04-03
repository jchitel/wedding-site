import webpack from 'webpack';
import fs = require('fs-extra');
import path = require('path');
import archiver = require('archiver');
import { execSync } from 'child_process';
import config from '../webpack.config';


async function bundle() {
    console.log(`Compiling ${config.entry}...`);
    const mode = process.env.NODE_ENV as webpack.Configuration['mode'] || 'development';
    const compiler = webpack({ ...config, mode, context: process.cwd() });
    const stats = await new Promise<webpack.Stats>((resolve, reject) => compiler.run((err, stats) => err ? reject(err) : resolve(stats)));
    console.log(`Bundled successfully to ${config.output.path}\n`);
}

async function zipDirectory(dir: string, target: string) {
    console.log('\tZipping build/ directory...');
    const archive = archiver('zip', { zlib: { level: 9 } });
    const outStream = fs.createWriteStream(target);
    archive.pipe(outStream);
    archive.directory(dir, false);
    await archive.finalize();
    console.log('\tZip complete.\n');
}

function installLambdaDependencies(dir: string) {	
    console.log('\tInstalling lambda dependencies...');	
    // run yarn	
    execSync('yarn', { stdio: 'inherit', cwd: dir });	
    console.log('\tDependencies installed.\n');	
}

(async () => {
    const build = path.join(__dirname, '..', 'build');
    const production = process.argv[2] === '--prod';

    // bundle site
    await bundle();

    // deploy mode
    if (production) {
        console.log('Setting up deployment package...');
        // set up lambda dependencies	
        installLambdaDependencies(build);
        // zip the build directory
        await zipDirectory(build, path.join(build, 'lambda.zip'));
    }
    console.log('Build complete!\n');
})();
