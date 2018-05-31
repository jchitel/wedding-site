/// <reference path="../../../typings/types.d.ts" />
import * as React from 'react';
import styles from '../rsvp.less';


export default class Login extends React.PureComponent {
    render() {
        return (
            <>
                <p className={styles.loginExplanation}>
                    As of May 31, 2018, we have closed our RSVP system to any updates.
                    If you wish to make any changes to your RSVP, please
                    contact <b>jchitel@gmail.com</b> or <b>(414)-861-0752</b>.
                </p>
                <p className={styles.loginExplanation}>
                    We'll see you on the big day!
                </p>
            </>
        );
    }
}
