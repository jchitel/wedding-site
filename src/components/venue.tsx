import * as React from 'react';
import { centerText } from '../styles';


export default function Venue() {
    return (
        <>
            <span id="venue" style={{ ...centerText, fontSize: '4em' }}>Ceremony</span>
            <span style={{ ...centerText, fontSize: '2.5em' }}>
                <a href="http://www.gesuparish.org/" target="_blank">Church of the Gesu</a>
            </span>
            <span style={{ ...centerText, fontSize: '1.5em' }}>1145 W Wisconsin Ave, Milwaukee, WI 53233</span>
            <span style={{ ...centerText, fontSize: '4em' }}>Reception</span>
            <span style={{ ...centerText, fontSize: '2.5em' }}>
                <a href="https://mam.org/" target="_blank">Milwaukee Art Museum</a>
            </span>
            <span style={{ ...centerText, fontSize: '1.5em' }}>700 N Art Museum Dr, Milwaukee, WI 53202</span>
        </>
    );
}
