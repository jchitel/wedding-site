import 'antd/lib/style';
import './style.less';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { colorPrimary, centerText } from './styles';
import Countdown from './components/countdown';
import Toc from './components/toc';
import Venue from './components/venue';
import Hotel from './components/hotel';
import Map from './components/map';
import Registry from './components/registry';


export default function App() {
    const bgStyle = {
        width: '100%',
        minHeight: '100%',
        color: colorPrimary
    };
    const fgStyle: React.CSSProperties = {
        maxWidth: 900,
        minHeight: '100%',
        margin: 'auto',
        boxShadow: '-20px 0 20px 10px rgba(0,0,0,0.75), 20px 0 20px 10px rgba(0,0,0,0.75)',
        paddingBottom: 40
    };
    const titleStyle = {
        fontFamily: 'wizard-hand',
        fontSize: '8em',
        ...centerText,
        marginBottom: 20
    };
    return (
        <div id="tray" style={bgStyle}>
            <div id="main" style={fgStyle}>
                <span style={titleStyle}>Megan &amp; Jake</span>
                <Hr />
                <Countdown />
                <Hr />
                <Toc />
                <Hr />
                <Venue />
                <Hr />
                <Hotel />
                <Hr />
                <Map />
                <Hr />
                <Registry />
            </div>
        </div>
    );
}

const Hr = () => <hr style={{ width: '80%', borderStyle: 'solid', borderColor: '#203453' }} />;

// document will not be available when doing server-side rendering
if (typeof document !== 'undefined') {
    hydrate(<App />, document.getElementById('root'));
}
