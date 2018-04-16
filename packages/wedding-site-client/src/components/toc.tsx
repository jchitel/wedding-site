import * as React from 'react';
import { centerText } from '../styles';


export default function Toc() {
    return (
        <>
            <span className="toc" style={{ ...centerText, fontSize: '2em' }}>
                <a href="#venue">Venue</a>
                &nbsp;|&nbsp;
                <a href="#hotel">Hotel</a>
                &nbsp;|&nbsp;
                <a href="#map">Map</a>
                &nbsp;|&nbsp;
                <a href="#registry">Registries</a>
                &nbsp;|&nbsp;
                <a href="#rsvp">RSVP</a>
            </span>
            <span className="toc" style={{ ...centerText, fontSize: '2em' }}>
                <a href="#couple">Bride &amp; Groom</a>
                &nbsp;|&nbsp;
                <a href="#party">Wedding Party</a>
                &nbsp;|&nbsp;
                <a href="#pics">Pictures</a>
            </span>
        </>
    );
}
