import * as React from 'react';
import { centerText } from '../styles';


const ceremonyTime = new Date(1529780400000);
const countdownStyle: React.CSSProperties = {
    fontFamily: 'wizard-hand',
    fontSize: '4em',
    display: 'flex',
    padding: '0 50px',
    justifyContent: 'center'
};
const unitStyle = {
    display: 'block',
    width: '22.5%',
    textAlign: 'center'
};
const slashStyle = {
    display: 'block',
    width: '2.5%'
};

interface ICountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default class Countdown extends React.PureComponent<{}, ICountdownState> {
    constructor(props: {}) {
        super(props);

        this.state = { days: 0, hours: 0, minutes: 0, seconds: 0 };
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
                <span style={{ ...countdownStyle, marginTop: 20 }}>
                    <span style={{...unitStyle}}>{days} Days</span>
                    <span style={{...slashStyle}}> / </span>
                    <span style={{...unitStyle}}>{hours} Hours</span>
                    <span style={{...slashStyle}}> / </span>
                    <span style={{...unitStyle}}>{minutes} Minutes</span>
                    <span style={{...slashStyle}}> / </span>
                    <span style={{...unitStyle}}>{seconds} Seconds</span>
                </span>
                <span style={{ ...centerText, fontSize: '2em', fontFamily: 'parchment-print' }}>Until</span>
                <span style={countdownStyle}>Saturday, June 23, 2018</span>
                <span style={countdownStyle}>2:00 PM</span>
            </>
        );
    }
}
