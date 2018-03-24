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
    // get tsconfig
    const tsConfig = fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8') as ts.TranspileOptions;
    const options: ts.TranspileOptions = {
        compilerOptions: {
            ...tsConfig.compilerOptions
        },
        reportDiagnostics: true
    };
    // resolve src, build, and all ts files
    const src = path.join(__dirname, '..', 'src');
    console.log('\tEnumerating .ts files...');
    const files = getAllTsFiles(src);
    // transpile and write each one
    console.log('\tStarting transpilation...');
    for (const file of files) {
        // transpile that file
        console.log(`\tTranspiling ${file}...`);
        const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { ...options, fileName: file });
        // look for any errors or warnings
        if (output.diagnostics && output.diagnostics.length && output.diagnostics.find(_ => _.category !== ts.DiagnosticCategory.Message)) {
            console.log('\tTypescript warnings/errors detected. Exiting...');
            process.exit(1);
        }
        // we're good, write the file and continue
        const relative = path.relative(src, file).replace(/\.tsx?$/, '.js');
        const out = path.join(build, relative);
        console.log(`\tSuccess, writing to ${out}..`);
        fs.ensureDirSync(path.dirname(out));
        fs.writeFileSync(out, output.outputText);
    }
    console.log('Transpilation completed successfully.\n');

    // deploy mode
    if (process.env.NODE_ENV === 'production') {
        console.log('Setting up deployment package...');
        // copy node_modules over
        console.log('\tCopying node_modules...');
        const nodeModules = path.join(__dirname, '..', 'node_modules');
        fs.copySync(nodeModules, path.join(build, 'node_modules'), { recursive: true });
        console.log('\tCopy successful.\n');

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
