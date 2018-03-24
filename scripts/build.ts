import Bundler = require('parcel-bundler');
import ts = require('typescript');
import fs = require('fs-extra');
import path = require('path');
import archiver = require('archiver');


(async () => {
    const build = path.join(__dirname, '..', 'build');

    // clean
    console.log('Emptying build/ directory...');
    fs.emptyDirSync(build);
    console.log('Directory emptied.\n');

    // run bundler
    console.log('Compiling bundles...');
    const bundler = new Bundler('./src/site/index.tsx', { outDir: path.join(build, 'bundle') });
    await bundler.bundle();
    console.log('Bundles compiled to ./build/bundle/\n');

    // run typescript on src/
    console.log('Transpiling typescript...');
    const tsBundler = new Bundler('./src/index.ts', { outDir: build, target: 'node' });
    await tsBundler.bundle();
    console.log('Transpilation completed successfully.\n');

    // deploy mode
    if (process.env.NODE_ENV === 'production') {
        console.log('Setting up deployment package...');
        // zip the build directory
        console.log('\tZipping build/ directory...');
        const archive = archiver('zip');
        const outStream = fs.createWriteStream(path.join(build, 'lambda.zip'));
        archive.pipe(outStream);
        archive.directory(build, false);
        await archive.finalize();
        console.log('\tZip complete.\n');
    }
    console.log('Build complete!\n');
})();

function getAllTsFiles(dir: string): string[] {
    if (!fs.statSync(dir).isDirectory()) return [];
    return fs.readdirSync(dir)
        .map(_ => path.join(dir, _))
        .reduce((files, _) => [...files, ...(fs.statSync(_).isDirectory() ? getAllTsFiles(_) : [_])], [])
        .filter(_ => /^[^.]+(?!\.d)\.tsx?$/.test(_));
}
