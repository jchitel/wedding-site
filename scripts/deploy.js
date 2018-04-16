const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');


async function zipDirectory(dir, target) {
    console.log('\tZipping build/ directory...');
    const archive = archiver('zip', { zlib: { level: 9 } });
    const outStream = fs.createWriteStream(target);
    archive.pipe(outStream);
    archive.directory(dir, false);
    await archive.finalize();
    console.log('\tZip complete.\n');
}

(async () => {
    const build = path.resolve(__dirname, '..', 'build');
    const packages = path.resolve(__dirname, '..', 'packages');
    const lambdaDeploy = path.resolve(__dirname, '..', 'lambda_deploy');
    console.log('Setting up deployment package...');
    // zip the build directory
    await fs.copy(path.resolve(packages, 'wedding-site-deploy'), lambdaDeploy, { dereference: true });
    await zipDirectory(lambdaDeploy, path.resolve(lambdaDeploy, 'lambda.zip'));
    // copy the client and graphiql build directories to our build directory
    await fs.copy(path.resolve(packages, 'wedding-site-client', 'build'), build);
    await fs.copy(path.resolve(packages, 'wedding-site-graphiql', 'build'), path.resolve(build, 'graphiql'));
    console.log('Package complete!\n');
})();
