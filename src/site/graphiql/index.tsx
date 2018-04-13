import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';


interface IQueryWindowState {
    name: string;
    houseNumber: string;
    token: string | null;
}

class QueryWindow extends React.PureComponent<{}, IQueryWindowState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            name: '',
            houseNumber: '',
            token: null
        };
    }

    submitCredentials = async () => {
        const response = await fetch(window.location.origin + '/graphql', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ query: `{ token: authenticate(name: "${this.state.name}", houseNumber: "${this.state.houseNumber}") }` })
        });
        const { data: { token } } = await response.json();
        this.setState({ token });
    }

    graphQLFetcher = async (params: any) => {
        const response = await fetch(window.location.origin + '/graphql', {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${this.state.token || ''}` },
            body: JSON.stringify(params)
        });
        return response.json();
    }

    render() {
        return <>
            {this.state.token
                ? <span>Authenticated</span>
                : <div style={{ display: 'flex', justifyContent: 'flex-start', padding: 10 }}>
                    <input type="text" value={this.state.name} onChange={_ => this.setState({ name: _.currentTarget.value })} placeholder="Name" />
                    <input type="text" value={this.state.houseNumber} onChange={_ => this.setState({ houseNumber: _.currentTarget.value })} placeholder="House Number" />
                    <button disabled={!this.state.name && !this.state.houseNumber} onClick={this.submitCredentials}>Submit</button>
                </div>}
            <GraphiQL fetcher={this.graphQLFetcher} />
        </>;
    }
}

ReactDOM.render(<QueryWindow />, document.getElementById('app'));
