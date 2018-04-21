import * as React from 'react';
import { centerText } from '../styles';


export default function Map() {
    const url = 'https://www.google.com/maps/embed/v1/directions'
        + '?origin=place_id:ChIJ50eLV9cCBYgRhHtBtSIZX0Q'
        + '&destination=place_id:ChIJxXFqjwAZBYgRnSJa_ZcX094'
        + '&key=AIzaSyCB7uuMVKZcFx1fKpp6cpSoOlYBRnLG88o';
    const width = Math.min(window.outerWidth, 600).toString();

    return (
        <>
            <span id="map" style={{ ...centerText, fontSize: '4em' }}>Map</span>
            <iframe
                width={width}
                height="450"
                frameBorder="0"
                style={{ display: 'block', margin: 'auto', border: 0 }}
                src={url}
                allowFullScreen />
        </>
    );
}
