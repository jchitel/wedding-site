export default class GraphQLClient {
    private token?: string;

    async authenticate(name: string, houseNumber: string) {
        const response = await this.fetch(`{ token: authenticate(name: "${name}", houseNumber: "${houseNumber}") }`);
        if (response)
    }

    private async fetch(query: string, ) {
        const response = await fetch('/graphql', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                authorization: this.token
            },
            body: JSON.stringify({ query })
        });
        if (response.status < 200 || response.status > 299)
            throw (await response.json()).errors;
        return (await response.json()).data;
    }
}