/// <reference path="../../typings/types.d.ts" />
import * as React from 'react';
import styles from '../styles/style.less';
import Countdown from './countdown';
import Toc from './toc';
import Venue from './venue';
import Hotel from './hotel';
import Registry from './registry';
import Rsvp from './rsvp';
import Couple from './couple';
import Party from './party';


export default function App() {
    return (
        <>
            <span className={styles.title}>Megan &amp; Jake</span>
            <hr />
            <Countdown />
            <hr />
            <Toc />
            <hr />
            <Venue />
            <hr />
            <Hotel />
            <hr />
            <Registry />
            <hr />
            <Rsvp />
            <hr />
            <Couple />
            <hr />
            <Party />
            <div className={styles.footer}>
                <span>
                    Created by Jake Chitel &copy; 2018
                    | <a href="https://github.com/jchitel/wedding-site" target="_blank">Source Code</a>
                </span>
            </div>
        </>
    );
}
