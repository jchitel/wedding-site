import React = require('react');
import { hydrate } from 'react-dom';
import App from './components/app';


hydrate(<App />, document.getElementById('root'));
