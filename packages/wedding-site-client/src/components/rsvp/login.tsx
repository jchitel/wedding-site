/// <reference path="../../../typings/types.d.ts" />
import * as React from 'react';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import styles from '../rsvp.less';
import { notification, Button } from 'antd';
import { ErrorCode } from 'wedding-site-shared';
import { createApolloFetch } from 'apollo-fetch';


interface LoginProps {
    onToken: (token: string) => void;
}

interface LoginState {
    nameInput: string;
    streetNumberInput: string;
}

const fetch = createApolloFetch({ uri: '/graphql' });

export default class Login extends React.PureComponent<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            nameInput: '',
            streetNumberInput: ''
        };
    }

    onEnter = async () => {
        const response = await fetch({
            query: `
                { token: authenticate(name: "${this.state.nameInput}", houseNumber: "${this.state.streetNumberInput}") }
            `
        });
        if (response.errors) {
            const error = response.errors[0];
            let loginErrorText: string;
            try {
                const parsed = JSON.parse(error.message);
                if (parsed.errorCode === ErrorCode.DUPLICATE_AUTH_RECORDS_FOUND) {
                    loginErrorText = 'What are the odds? Someone else had the exact same information as you. Please try again with a different name.';
                } else if (parsed.errorCode == ErrorCode.NO_AUTH_RECORD_FOUND) {
                    loginErrorText = 'That information did not match any invitation. Please try again with a different name or house number, or contact jchitel@gmail.com.';
                } else {
                    loginErrorText = 'Something went wrong. Please try again or contact jchitel@gmail.com.';
                }
            } catch {
                loginErrorText = 'Something went wrong. Please try again or contact jchitel@gmail.com.';
            }
            notification.error({
                message: 'Error',
                description: loginErrorText,
                duration: 15
            });
        } else {
            this.props.onToken(response.data.token);
        }
    }

    render() {
        const { nameInput, streetNumberInput } = this.state;

        return (
            <>
                <p className={styles.loginExplanation}>
                    To view your RSVP for our wedding, please enter <b>any part of the
                    name</b> of one of the guests and the <b>house number</b> from
                    the invitation. Because there are several guests with the
                    same first or last name, the house number will provide verification
                    that you have selected the correct invitation. 
                </p>
                <p className={styles.loginExplanation}>
                    For example, if your name is <b>"John Smith"</b> and your address
                    is <b>"1234 Main Street"</b>, you can
                    enter <b>"john"</b>, <b>"smith"</b>, or <b>"john smith"</b> for
                    the name, but you must enter <b>"1234"</b> for the house number.
                </p>
                <p className={styles.loginExplanation}>
                    If, for some reason, this is not working for you,
                    please contact <b>jchitel@gmail.com</b>.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', minWidth: 400, maxWidth: '90%', margin: 'auto', marginBottom: 15 }}>
                    <Input
                        className={styles.loginInput}
                        value={nameInput}
                        onChange={e => this.setState({ nameInput: e.currentTarget.value })}
                        onPressEnter={this.onEnter}
                        placeholder="Name"
                    />
                    <Input
                        className={styles.loginInput}
                        value={streetNumberInput}
                        onChange={e => this.setState({ streetNumberInput: e.currentTarget.value })}
                        onPressEnter={this.onEnter}
                        placeholder="House Number"
                    />
                    <Button className={styles.showOnMobile} onClick={this.onEnter}>Login</Button>
                </div>
                {nameInput && streetNumberInput && <p className={`${styles.loginExplanation} ${styles.hideOnMobile}`}>
                    Press Enter to look up your RSVP.
                </p>}
            </>
        );
    }
}
