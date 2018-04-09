import { invitationGuests } from './guest';
import { IFieldResolver } from 'graphql-tools';
import { IWeddingSiteContext } from './schema';
import { ErrorCode } from '../shared';
import AuthClient from '../data/auth';
import InvitationClient from '../data/invitation';

export const typeDef = `
# The collection of guests on a single invitation.
# This can be looked up using any of the guest's names,
# and the house number from the address.
type Invitation {
    # Unique id given to each invitation
    invitationId: Int!
    # Address info for invitation
    address: Address!
    # List of guests on invitation
    guests: [Guest]!
}

# An address for an invitation
type Address {
    # House number, kept separate for lookups
    houseNumber: String!
    # Full street address (house number and street name)
    streetAddress: String!
    # Apartment number (optional)
    aptNumber: String
    # City
    city: String!
    # State
    state: String!
    # Zip code
    zip: String!
}
`;

export const Invitation = {
    guests: invitationGuests
};

export const rootInvitation: IFieldResolver<{}, IWeddingSiteContext> = async (_source, _args, context) => {
    // verify guest auth
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);
    // admin cannot get an invitation because there is not a 1:1 relationship for the admin user
    if (claims.isAdmin) throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED }));

    // retrieve invitation
    const invitationClient = new InvitationClient(context.client);
    return invitationClient.queryById(claims.invitationId!);
}

export const allInvitations: IFieldResolver<{}, IWeddingSiteContext> = async (_source, _args, context) => {
    // verify admin auth
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);
    // guest does not have access to all invites
    if (!claims.isAdmin) throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED }));

    // retrieve invitations
    const invitationClient = new InvitationClient(context.client);
    return invitationClient.queryAll();
}

export const byInvitationId: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // verify admin auth
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);
    // guest cannot request specific invites
    if (!claims.isAdmin) throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED }));

    // retrieve invitation
    const invitationClient = new InvitationClient(context.client);
    const invitation = await invitationClient.queryById(args.invitationId);
    if (!invitation) throw new Error(JSON.stringify({ errorCode: ErrorCode.NO_RECORDS_FOUND }));
    return invitation;
}

export const byNameAndHouseNumber: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // verify admin auth
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);
    // guest cannot request specific invites
    if (!claims.isAdmin) throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED }));

    // retrieve invitation
    const invitationClient = new InvitationClient(context.client);
    const invitations = await invitationClient.queryByNameAndHouseNumber(args.name, args.houseNumber);
    if (invitations.length === 0) {
        throw new Error(JSON.stringify({ errorCode: ErrorCode.NO_RECORDS_FOUND }));
    } else if (invitations.length > 1) {
        throw new Error(JSON.stringify({ errorCode: ErrorCode.DUPLICATE_RECORDS_FOUND }));
    }
    return invitations[0];
}
