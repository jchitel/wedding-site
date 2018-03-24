if (typeof document !== 'undefined') {
    require('antd/lib/style');
    require('../style.less');
}
import * as React from 'react';
import { colorPrimary, centerText } from '../styles';
import Countdown from './countdown';
import Toc from './toc';
import Venue from './venue';
import Hotel from './hotel';
import Map from './map';
import Registry from './registry';


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
        boxShadow: '-20px 0 20px 10px rgba(0,0,0,0.75), 20px 0 20px 10px rgba(0,0,0,0.75)'
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
                <div style={{ paddingTop: 60, paddingBottom: 10, fontSize: '1em', ...centerText }}>
                    <span>
                        Created by Jake Chitel &copy; 2018
                        | <a href="https://github.com/jchitel/wedding-site" target="_blank">Source Code</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

const Hr = () => <hr style={{ width: '80%', borderStyle: 'solid', borderColor: '#203453' }} />;
