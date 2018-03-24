import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import App from './site/components/app';


let rendered: string;

export default function renderApp() {
    // render the app to a hydratable string
    if (!rendered) rendered = renderToString(<App />);
    
    // render the document to static markup containing the app string
    return renderToStaticMarkup(
        <html>
            <head>
                <link rel="stylesheet" href="bundle/index.css" />
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: rendered }} />
                <script src="bundle/index.js" />
            </body>
        </html>
    );
}
