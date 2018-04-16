import * as React from 'react';
import { centerText } from '../styles';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';


interface RsvpState {
    nameInput: string;
    streetNumberInput: string;
}

export default class Rsvp extends React.PureComponent<{}, RsvpState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            nameInput: '',
            streetNumberInput: '',
        };
    }

    onEnter = () => {

    }

    render() {
        const { nameInput, streetNumberInput } = this.state;
        const pStyles = { padding: '0 80px', fontSize: '1rem' };
        const inputStyles = { backgroundColor: 'rgba(255,255,255,0.5)', fontFamily: 'parchment-print' };

        return (
            <>
                <span id="rsvp" style={{ ...centerText, fontSize: '4em' }}>RSVP</span>
                <p style={pStyles}>
                    To view your RSVP for our wedding, please enter <b>any part of the
                    name</b> of one of the guests and the <b>house number</b> from
                    the invite. Because there are several guests with the
                    same last name, the house number will provide verification
                    that you have selected the correct invite. 
                </p>
                <p style={pStyles}>
                    For example, if your name is <b>"John Smith"</b> and your address
                    is <b>"1234 Main Street"</b>, you can
                    enter <b>"John"</b>, <b>"Smith"</b>, <b>"john"</b>, or <b>"smith"</b> for
                    the name, and you must enter <b>"1234"</b> for the house number.
                </p>
                <p>
                    Press Enter to look up your RSVP.
                </p>
                <p style={pStyles}>
                    If, for some reason, this is not working for you,
                    please contact <b>jchitel@gmail.com</b>.
                </p>
                <div style={{ display: 'flex', width: 400, margin: 'auto' }}>
                    <Input
                        style={{ ...inputStyles, marginRight: 20 }}
                        value={nameInput}
                        onChange={e => this.setState({ nameInput: e.currentTarget.value })}
                        
                        onPressEnter={this.onEnter}
                        placeholder="Name"
                    />
                    <Input
                        style={inputStyles}
                        value={streetNumberInput}
                        onChange={e => this.setState({ streetNumberInput: e.currentTarget.value })}
                        onPressEnter={this.onEnter}
                        placeholder="House Number"
                    />
                </div>
            </>
        )
    }
}
