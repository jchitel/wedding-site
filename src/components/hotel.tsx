import * as React from 'react';
import { centerText } from '../styles';


export default function Hotel() {
    return (
        <>
            <span id="hotel" style={{ ...centerText, fontSize: '4em' }}>Hotel</span>
            <span style={{ ...centerText, fontSize: '2.5em' }}>Fairfield Inn &amp; Suites Milwaukee Downtown</span>
            <span style={{ ...centerText, fontSize: '1.5em' }}>710 N Old World Third St, Milwaukee, Wisconsin 53203</span>
            <span style={{ ...centerText, fontSize: '2em' }}>
                <a href="http://cwp.marriott.com/mkefd/heimchitelwedding/" target="_blank">Reserve your room here!</a>
            </span>
        </>
    );
}
