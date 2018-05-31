/// <reference path="../../typings/types.d.ts" />
import * as React from 'react';
import styles from './rsvp.less';
import Login from './rsvp/login';


export default class Rsvp extends React.PureComponent {
    render() {
        return (
            <>
                <span id="rsvp" className={styles.header}>RSVP</span>
                <Login />
            </>
        );
    }
}
