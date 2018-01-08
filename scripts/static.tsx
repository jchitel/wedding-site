import React = require('react');
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync as writeFile } from 'fs';
import { resolve } from 'path';

import App from '../src';

/**
 * This site is hosted in GH Pages, thus it can only host static content.
 * However, having the site download and then render can result in a bad UX,
 * so we still want to take advantage of server-side rendering even though
 * we can't actually render on the server.
 * This script will do exactly what server-side rendering would do,
 * but it is designed to be run on deployment (from Travis).
 * The pre-rendered result is saved to the expected index.html file.
 */

// render the app to a hydratable string
const rendered = renderToString(<App />);

const dir = process.argv[2] === '--prod' ? 'dist' : 'build';

// render the document to static markup containing the app string
const document = renderToStaticMarkup(
    <html>
        <head>
            <script src={`${dir}/bundle.js`} />
        </head>
        <body dangerouslySetInnerHTML={{ __html: rendered }}></body>
    </html>
);
// write the document
writeFile(resolve(__dirname, '..', 'index.html'), document, { encoding: 'utf8', flag: 'w' });
