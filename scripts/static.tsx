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

const dir = process.argv[2] === '--prod' ? 'dist' : 'build';

// render the document to static markup containing the app string
const document = renderToStaticMarkup(
    <html>
        <head>
            <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: rendered }} />
            <script src="bundle.js" />
        </body>
    </html>
);
// write the document
writeFile(resolve(__dirname, '..', dir, 'index.html'), document, { encoding: 'utf8', flag: 'w' });
