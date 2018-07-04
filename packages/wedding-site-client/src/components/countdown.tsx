import * as React from 'react';
import commonStyles from '../styles/style.less';
import styles from './countdown.less';


const ceremonyTime = new Date(1529782440000);

interface ICountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    since: boolean;
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
        let diff = ceremonyTime.getTime() - (new Date()).getTime();
        const since = diff < 0;
        diff = Math.abs(diff);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return {
            days,
            hours: hours - days * 24,
            minutes: minutes - hours * 60,
            seconds: seconds - minutes * 60,
            since
        };
    }

    updateValues = () => this.setState(this.getValues());

    render() {
        const { days, hours, minutes, seconds, since } = this.state;

        return (
            <>
                <span className={styles.countdown} style={{ marginTop: 20 }}>
                    <div className={styles.unit}>
                        <span style={{ minWidth: 75 }}>{days}</span>
                        <span>Days</span>
                    </div>
                    <div className={styles.unit}>
                        <span style={{ minWidth: 75 }}>{hours}</span>
                        <span>Hours</span>
                    </div>
                    <div className={styles.unit}>
                        <span style={{ minWidth: 75 }}>{minutes}</span>
                        <span>Minutes</span>
                    </div>
                    <div className={styles.unit}>
                        <span style={{ minWidth: 75 }}>{seconds}</span>
                        <span>Seconds</span>
                    </div>
                </span>
                <span className={commonStyles.centerText} style={{ fontSize: '2em', fontFamily: 'parchment-print' }}>
                    {since ? 'Since' : 'Until'}
                </span>
                <span className={styles.countdown}>Saturday, June 23, 2018</span>
                <span className={styles.countdown}>2:00 PM</span>
            </>
        );
    }
}
