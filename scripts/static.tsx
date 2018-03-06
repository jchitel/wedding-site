import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync as writeFile } from 'fs';
import { resolve } from 'path';

require.extensions['.less'] = () => ({});
require.extensions['.png'] = (filename: string) => filename;

import App from '../src';

/**
 * See README.md for more information.
 */

// render the app to a hydratable string
const rendered = renderToString(<App />);

const prod = process.argv[2] === '--prod';

// render the document to static markup containing the app string
const document = renderToStaticMarkup(
    <html>
        <head>
            <link rel="stylesheet" href={prod ? 'dist/styles.css' : 'styles.css'} />
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: rendered }} />
            <script src={prod ? 'dist/bundle.js' : 'bundle.js'} />
        </body>
    </html>
);
// write the document
writeFile(resolve(__dirname, '..', prod ? 'index.html' : 'build/index.html'), document, { encoding: 'utf8', flag: 'w' });
