import * as React from 'react';
import { centerText } from '../styles';


export default function Toc() {
    return (
        <>
            <span className="toc" style={{ ...centerText, fontSize: '2em', width: '80%', margin: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <a className="toc-link" href="#venue">Venue</a>
                <a className="toc-link" href="#hotel">Hotel</a>
                <a className="toc-link" href="#map">Map</a>
                <a className="toc-link" href="#registry">Registries</a>
                <a className="toc-link" href="#rsvp">RSVP</a>
                <a className="toc-link" href="#couple">Bride &amp; Groom</a>
                <a className="toc-link" href="#party">Wedding Party</a>
                <a className="toc-link" href="#pics">Pictures</a>
            </span>
        </>
    );
}
