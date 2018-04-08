# Website for my 2018 wedding

[![Build Status](https://travis-ci.org/jchitel/wedding-site.svg?branch=master)](https://travis-ci.org/jchitel/wedding-site)

This website is a React app hosted in AWS Lambda with an Express backend.

The public site is accessible from https://www.chitelwedding2018.com (http://chitelwedding.com will redirect).

## Structure

The site is composed of two parts: a server and a client bundle. The server exists
in `/src/` (ignoring `/src/site/`), and the client exists in `/src/site/`. The server
includes a few files for setting up the Express app, as well as a separate entry point
file for the Lambda deployment. The site contains an `index.html` file, some Less styles,
and several React component files, as well as a client-side entry point. All code is
written in TypeScript (barring obvious exceptions like styles and html).

## Build and Deployment

For the sake of simplicity, the site bundle is built during deployment and served
statically, rather than being rendered on the server side.

### Building

There are two elements to the build process:
- Transpiling server typescript
- Compiling client bundle

#### Server Transpilation

To transpile the server, the standard TypeScript compiler `tsc` is used. By default,
`tsc` will use the repository's `/tsconfig.json` file for transpiler configuration.
The server source files are transpiled and written 1:1 to the `/build/` directory.
The transpiler is configured to output to ES2015, which is compatible with the
currently used Node runtime version in Lambda (Node v6.10).

#### Client Bundle Compilation

The client bundle is compiled using Webpack. Another option considered was Parcel,
which is a recent project that opts for convention over configuration so that
bundle compilation works out of the box. However, several attempts to use it have
resulted in bugs and unexpected behavior, leading to the conclusion that it is
simply not mature enough yet. Webpack is a far more mature option that is moving
toward less and less configuration all the time. It was relatively painless to set up.

The Webpack build points to `/src/site/index.tsx` as an entry point. All TypeScript,
Less, image, and font files imported from there are processed by Webpack to output
individual bundle files:
- `/build/bundle/main.js` (compile target for all typescript code)
- `/build/bundle/index.css` (compile target for all Less/CSS code)
- `/build/bundle/{hash}.{jpg|png|ttf}` (compile target for all static resources)

Additionally, Webpack's `HtmlWebpackPlugin` is used to construct an `index.html` file
that imports all of these dynamically generated resources. The template for this exists
at `/src/site/index.html`. The configuration for this plugin also includes the site's
`favicon.ico` file.

#### Build Process

The build process will run `tsc` to compile the server, followed by `webpack` to compile
the client. These can effectively be run in any order.

### Deployment

In addition to the build steps, deployment also requires setting up a Lambda deployment
package, and configuring production settings for Webpack.

#### Webpack Production Settings

Starting with Webpack 4, "production" mode can be turned on, which automatically enables
several settings for optimizing production builds, including code minification and dead
code elimination.

#### Lambda Deployment Package

For anything other than a single file, Lambda requires a zip archive containing the full
source of the function code to be deployed. This archive should have the Lambda handler
file at the root, so that it can be accessible via Lambda's "handler" configuration. For
my purposes, the lambda handler exists in the `/build/index.js` file, at the `handler`
export (configured as `index.handler`).

Because the server uses external dependencies, those dependencies need to be included in
the package. To facilitate this, the `/build/` directory has its own `package.json` and
`yarn.lock`. To set up the deployment package, `yarn` is run with `/build/` as the CWD,
which causes the build specific dependencies to be installed at `/build/node_modules/`.

Once the server is transpiled, the client bundle is compiled, and the dependencies are
installed, the deployment zips up the whole `/build/` directory to `/build/lambda.zip`.
This is the final deployment package.

### Travis Builds

In order to run the deployment process as part of a CI deployment, a Travis configuration
is set up for this repository. This configuration is set up to run on pushes to the master
branch. This is the process:

1. Clone the repository at the pushed commit. (base configuration)
2. Install yarn dependencies. (because the language is set to "node_js" and we have a "yarn.lock")
3. Run `npm run deploy`. (specifically configured script in `.travis.yml`, calls script defined in 'package.json')
   1. Run tsc to build the server files.
   1. Run Webpack to build the client bundle files.
   2. Run the deployment script to install build dependencies and create the deployment package.
4. Deploy the package to AWS Lambda using the config settings in `.travis.yml`.

### Build Process

**TODO**: Go into detail here

### Architecture

**TODO**: Go into detail here

### Full Process

**TODO**: Update this

Given the above context, this is the full process:

1. Make code changes
2. Commit, push to master
3. Travis build starts
4. Repo clone set up
5. Build script run, generating 'dist/bundle.js' and 'index.html'.
6. Force-push to 'gh-pages' branch.
7. Travis build complete.
8. Navigate to http://chitelwedding2018.com to view the deployed result.

## Development

To run the development site, do the following:

1. Ensure Node.js >= 8 and Yarn (`npm install -g yarn`) are installed.
2. `git clone https://github.com/jchitel/wedding-site.git && cd wedding-site`
3. `npm run local`
4. Navigate to `localhost:1235`
5. To get the Google Maps frame to work locally, you can configure your `hosts` file to
   have `http://www.chitelwedding2018.com` point to `127.0.0.1` or another loopback address.
   You can then navigate to `www.chitelwedding2018.com:1235`.

## TODO

- [x] Use a dev server instead of a static local file
- [x] Add optimizations (uglify, etc.) to production webpack configuration
- [x] Add source maps support to webpack configuration
- [ ] Create site skeleton:
  - [ ] UNDER CONSTRUCTION banner
  - [x] Title
  - [x] Countdown
  - [x] TOC (w/ links)
  - [x] Venue info (w/ links)
  - [x] Hotel info (w/ links)
  - [x] Embedded Google Map
    - [ ] Display markers
    - [ ] Allow input for directions
  - [x] Links to registries
  - [ ] RSVP
  - [ ] Info about couple
  - [ ] Info about wedding party
  - [ ] Other miscellaneous wedding info
  - [ ] Pictures
  - ...?
- [ ] Set up AWS resources for RSVP
  - [ ] RSVP Database
  - [ ] SMS/Email subscriptions
  - [ ] Lambda logic
- [x] Add countdown logic
- [ ] Add Google Maps logic
- [ ] Add RSVP logic
  - [ ] Populate DB with guest info (via admin console)
  - [ ] "login" with name and street number
  - [ ] Subscription setup
  - [ ] RSVP Status update
- [ ] Add details about couple and wedding party (mainly manual)
- [ ] Styling (just delaying the inevitable)
- [ ] Determine what else should be added?
