/// <reference path="../../typings/types.d.ts" />
import * as React from 'react';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import styles from './rsvp.less';
import Login from './rsvp/login';
import { JwtClaims } from 'wedding-site-shared';
import { createApolloFetch, ApolloFetch } from 'apollo-fetch';
import Admin from './rsvp/admin';


interface RsvpState {
    jwt: string | null;
}

export default class Rsvp extends React.PureComponent<{}, RsvpState> {
    fetch: ApolloFetch;

    constructor(props: {}) {
        super(props);

        this.fetch = createApolloFetch({
            uri: '/graphql',
            constructOptions: (request, options) => ({
                ...options,
                headers: {
                    ...options.headers,
                    authorization: `Bearer ${this.state.jwt}`
                }
            })
        });

        this.state = {
            jwt: localStorage.getItem('wedding-site-jwt')
        };
    }

    onToken = (token: string) => {
        localStorage.setItem('wedding-site-jwt', token);
        this.setState({ jwt: token });
    }

    onLogout = () => {
        localStorage.removeItem('wedding-site-jwt');
        this.setState({ jwt: null });
    }

    getClaims(): { isAdmin?: boolean, invitationId?: number } {
        if (!this.state.jwt) return {};
        const payload = this.state.jwt.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return {
            isAdmin: decoded[JwtClaims.IsAdmin],
            invitationId: decoded[JwtClaims.InvitationId]
        }
    }

    render() {
        const claims = this.getClaims();
        return (
            <>
                <span id="rsvp" className={styles.header}>RSVP</span>
                {this.state.jwt
                    ? claims.isAdmin
                        ? <Admin fetch={this.fetch} onLogout={this.onLogout} />
                        : <ManageRsvp fetch={this.fetch} invitationId={claims.invitationId!} />
                    : <Login onToken={this.onToken} />}
            </>
        );
    }
}
