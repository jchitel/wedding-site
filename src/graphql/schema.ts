import { makeExecutableSchema } from 'graphql-tools';
import { typeDef as queryTypeDef, Query } from './query';
import { typeDef as mutationTypeDef, Mutation } from './mutation';
import { typeDef as invitationTypeDef, Invitation } from './invitation';
import { typeDef as guestTypeDef, RsvpStatus, GuestOwner, GuestType, Guest } from './guest';
import { typeDef as statsTypeDef } from './stats';
import SqlClient from '../data/sql-client';


export interface IWeddingSiteContext {
    token: string;
    client: SqlClient;
}

const schema = makeExecutableSchema({
    typeDefs: [
        'schema { query: Query mutation: Mutation }',
        queryTypeDef,
        mutationTypeDef,
        invitationTypeDef,
        guestTypeDef,
        statsTypeDef
    ],
    resolvers: {
        Query,
        Mutation,
        Invitation,
        RsvpStatus,
        Guest,
        GuestOwner,
        GuestType
    }
});
export default schema;
