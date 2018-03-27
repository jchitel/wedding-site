import Bundler = require('parcel-bundler');
import fs = require('fs-extra');
import path = require('path');
import archiver = require('archiver');
import { execSync } from 'child_process';


async function bundle(entry: string, outDir: string, target?: 'node') {
    console.log(`Compiling ${entry}...`);
    const bundler = new Bundler(entry, { outDir, target });
    await bundler.bundle();
    console.log(`Bundled successfully to ${outDir}\n`);
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

    // bundle site
    await bundle('./src/site/index.tsx', path.join(build, 'bundle'));
    // bundle server
    //await bundle('./src/index.ts', build, 'node');

    // deploy mode
    if (process.env.NODE_ENV === 'production') {
        console.log('Setting up deployment package...');
        // set up lambda dependencies	
        installLambdaDependencies(build);
        // zip the build directory
        await zipDirectory(build, path.join(build, 'lambda.zip'));
    }
    console.log('Build complete!\n');
})();
