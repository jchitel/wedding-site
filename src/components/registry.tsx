import * as React from 'react';
import { centerText, colorPrimary } from '../styles';


// TODO: in progress
export default function Registry() {
    return (
        <>
            <span id="registry" style={{ ...centerText, fontSize: '4em' }}>Registries</span>
            <div style={{ position: 'absolute', display: 'flex', justifyContent: 'space-around', alignContent: 'center', maxHeight: 300 }}>
                <a href="" style={{ minWidth: '30%' }}><div id="target-img" /></a>
                <div style={{ height: '100%', border: `1px solid ${colorPrimary}` }} />
                <a href="" style={{ minWidth: '30%' }}><div id="bbb-img" /></a>
                <div style={{ height: '100%', border: `1px solid ${colorPrimary}` }} />
                <a href="" style={{ minWidth: '30%' }}><div id="amazon-img" /></a>
            </div>
        </>
    );
}