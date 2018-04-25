import * as React from 'react';
import commonStyles from '../styles/style.less';
import styles from './countdown.less';


const ceremonyTime = new Date(1529780400000);

interface ICountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default class Countdown extends React.PureComponent<{}, ICountdownState> {
    constructor(props: {}) {
        super(props);

        this.state = this.getValues();
    }

    componentDidMount() {
        setInterval(this.updateValues, 1000);
    }

    getValues() {
        const diff = ceremonyTime.getTime() - (new Date()).getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return {
            days,
            hours: hours - days * 24,
            minutes: minutes - hours * 60,
            seconds: seconds - minutes * 60
        };
    }

    updateValues = () => this.setState(this.getValues());

    render() {
        const { days, hours, minutes, seconds } = this.state;

        return (
            <>
                <span className={styles.countdown} style={{ marginTop: 20 }}>
                    <span className={styles.unit} style={{ minWidth: 100 }}>{days}</span>
                    <span className={styles.unit}>Days</span>
                    <span className={styles.unit} style={{ minWidth: 100 }}>{hours}</span>
                    <span className={styles.unit}>Hours</span>
                    <span className={styles.unit} style={{ minWidth: 100 }}>{minutes}</span>
                    <span className={styles.unit}>Minutes</span>
                    <span className={styles.unit} style={{ minWidth: 100 }}>{seconds}</span>
                    <span className={styles.unit}>Seconds</span>
                </span>
                <span className={commonStyles.centerText} style={{ fontSize: '2em', fontFamily: 'parchment-print' }}>Until</span>
                <span className={styles.countdown}>Saturday, June 23, 2018</span>
                <span className={styles.countdown}>2:00 PM</span>
            </>
        );
    }
}
