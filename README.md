# Website for my 2018 wedding

[![Build Status](https://travis-ci.org/jchitel/wedding-site.svg?branch=master)](https://travis-ci.org/jchitel/wedding-site)

This website is a React app hosted in GitHub Pages, under the 'gh-pages' branch
of this repository.

The public site is accessible from http://chitelwedding2018.com.

## Structure

The site is (currently) composed of a root index.html file and a bundle.js file,
both of which are generated during the build process. The index.html file
is the root of the site, containing the mount point of the view and any references
to assets (such as bundle.js). The bundle.js file contains all JS code for the site,
including all React libraries and the actual view logic for the site.

## Build and Deployment

Due to the fact that this is a React site hosted on GH Pages, the build and deployment
processes are not very conventional, though it is quite simple.

### Server-Side Rendering

The recommended hosting mechanism for React-based websites is to make use of
"server-side rendering," which is a process that renders the site initially on the
server, on request of the page, so that when the page arrives at the user's browser,
all of the content is already available before any JS code is executed. This provides
the benefit that the user does not have to wait for the site to load before being
able to see it, as client-side frameworks such as React can take significant (>100 ms)
time to load. In a React app, when the view is mounted in a server-side rendered app,
it is called "hydration", where React then links its runtime rendering processes to
the pre-rendered view and can then become interactive.

Traditionally, server-side rendering is done in a Node server within the host, so
the http request handler for the root of the website runs `ReactDOM.renderToString()`
to render the site, and then returns the result as HTML content. However, a different
process is required for this website.

### GitHub Pages

GitHub Pages can only host *static* content, and is not capable of running any code
on the server side. This means that traditional server-side rendering is not possible.
Instead, the site is "pre-rendered" before being pushed to the repository. This could
be done manually, but it is much easier to run this in a CI process. With this process,
instead of the site being rendered on each request, it is run once, on deployment.
The render result is saved to static files in the 'gh-pages' branch, so in many ways
this is far more performant than traditional server-side rendering.

### Travis Builds

In order to run this rendering process as part of a CI deployment, a Travis configuration
is set up for this repository. This configuration is set up to run on pushes to the master
branch. This is the process:

1. Clone the repository at the pushed commit. (base configuration)
2. Install NPM dependencies. (because the language is set to "node_js")
3. Run `npm run deploy`. (specifically configured script in `.travis.yml`, calls script defined in 'package.json')
   1. Run Webpack to build the bundle.js file from the entry point 'src/index.tsx' file.
   2. Run the 'scripts/static.tsx' script to generate the index.html file.
4. Force push to the 'gh-pages' branch. (because deployment.provider is set to "pages")

### Build Process

There are currently two resources that need to be generated in the build script: index.html
and bundle.js.

#### `bundle.js`

All of the source JS code is located under the src/ directory. The entry point of the app
is src/index.tsx. '.tsx' is the extension for a TypeScript file with JSX enabled. Non-JSX
TypeScript files have an extension of '.ts'. Standard ECMAScript module support is built-in
with TypeScript, so all 'import' and 'export' declarations in the source files are used
to declare dependencies between modules.

Webpack is used to build 'bundle.js', and its configuration is defined in webpack.config.js.
In the configuration, './src' is defined as the entry point of the app, which will resolve to
'./src/index', and '.tsx' is an allowable extension for "no extension" imports, so the entry
point resolves to './src/index.tsx'. The loader configurations specify that any '.ts' or '.tsx'
files should be loaded with the 'awesome-typescript-loader', which will run TypeScript to
compile those files to normal JS. The loader uses the 'tsconfig.json' to run TypeScript on
the files.

Webpack ultimately receives the compiled JS code for each module, and is able to trace the
module dependenices to decide which modules need to be included in the resulting bundle.
Webpack injects some boilerplate code around each module's content, and concatenates the
results into one bundle.js file, as configured in webpack.config.js.

The destination of this file is dependent on which build script is run. Travis will run
'build-prod', which will run webpack with its 'env' variable set to 'production'. This
variable gets passed to the config. When 'env' is set to 'production', the destination
folder is set to 'dist/'. This directory is not ignored in the .gitignore file, so when
Travis pushes the generated repository to the 'gh-pages' branch, the 'dist/' directory
will be included. When 'env' is not set to production, the destination directory of the
bundle is 'build/', which *is* ignored in .gitignore. This allows development build
results to be properly ignored.

#### `index.html`

To generate the 'index.html' file, React's server-side rendering API needs to be called.
This is done in 'scripts/static.tsx'. This script imports the top-level React component
of the website (`App`), and renders it with `renderToString()` from `react-dom`. This
will generate an HTML string from a single render of the component tree, annotated with
attributes so that React will know how to hydrate the component tree at runtime.

Then, the rendered HTML string needs to be rendered into something. The script uses
`renderToStaticMarkup()` from `react-dom` to generate a valid HTML document, with the
rendered app markup inserted into the document's body. `renderToStaticMarkup()` does the
same thing as `renderToString()`, but does not include any of the React attributes, leaving
only a bare HTML string. We do this because React has nothing to do with the markup
outside of the component tree. This top-level markup also includes the reference to the 
bundle.js file, which will be 'build/bundle.js' during development and 'dist/bundle.js'
in production.

The component tree needs to be inserted using `dangerouslySetInnerHTML` because React will
escape any HTML inserted as a normal string into a component tree, and we want the HTML
to be unescaped. This is "dangerous" because when user-provided text is inserted as HTML
into a document, dangerous code may be injected into the site. Because this is done at build-time,
and is not user-provided text, this is not a problem.

The final rendered HTML string is then saved to 'index.html', overwriting any content that was
there before. Ideally, we would generate this file in 'dist/', but GH Pages does not allow
any configuration of the location of the root page of the site. It *must* be 'index.html'.

### Full Process

Given the above context, this is the full process:

1. Make code changes
2. Commit, push to master
3. Travis build starts
4. Repo clone set up
5. Build script run, generating 'dist/bundle.js' and 'index.html'.
6. Force-push to 'gh-pages' branch.
7. Travis buil complete.
8. Navigate to http://chitelwedding2018.com to view the deployed result.

## Development

To run the development site, do the following:

1. Ensure Node.js >= 8 and NPM >= 5 (comes with Node >= 8) are installed.
2. `git clone https://github.com/jchitel/wedding-site.git && cd wedding-site`
3. `npm run deploy-local`
4. Navigate to 'file:///.../wedding-site/index.html

## TODO

- [ ] Use a dev server instead of a static local file
- [ ] Add optimizations (uglify, etc.) to production webpack configuration
- [ ] Add source maps support to webpack configuration
- [ ] Create site skeleton:
  - [ ] UNDER CONSTRUCTION banner
  - [ ] Title
  - [ ] Countdown
  - [ ] TOC (w/ links)
  - [ ] Venue info (w/ links)
  - [ ] Hotel info (w/ links)
  - [ ] Embedded Google Map
  - [ ] Links to registries
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
- [ ] Add countdown logic
- [ ] Add Google Maps logic
- [ ] Add RSVP logic
  - [ ] Populate DB with guest info (mainly manual)
  - [ ] Code generation (mainly manual, add to DB)
  - [ ] "login" with code (will be included in invites)
  - [ ] Subscription setup
  - [ ] RSVP Status update
- [ ] Add details about couple and wedding party (mainly manual)
- [ ] Styling (just delaying the inevitable)
- [ ] Determine what else should be added?
