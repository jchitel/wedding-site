import * as React from 'react';
import { hydrate } from 'react-dom';


export default function App() {
    return <div>Hello world</div>;
}

// document will not be available when doing server-side rendering
if (typeof document !== 'undefined') {
    hydrate(<App />, document.getElementById('root'));
}
