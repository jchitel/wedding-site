import { IFieldResolver } from "graphql-tools";
import { IWeddingSiteContext } from "./schema";
import AuthClient from "../data/auth";
import StatsClient from "../data/stats";

export const typeDef = `
# Various statistics about the current state of guests.
# The number not yet responded can be computed by subtracting
# the number attending and not attending from the number invited.
type GuestRsvpStats {
    # Total invited
    numInvited: Int!
    # Total attending
    numAttending: Int!
    # Total not attending
    numNotAttending: Int!
}

# Invitation-level statistics
type InvitationStats {
    # Total number of invitations sent
    numInvitations: Int!
    # Total number of invitations with a response (including verbal or by mail)
    numInvitationsResponded: Int!
}
`;

export const guestRsvpStats: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // verify admin auth
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // request stats
    const statsClient = new StatsClient(context.client);
    return statsClient.queryGuestRsvpStats(args.owner, args.type, args.plusOnes);
}

export const invitationStats: IFieldResolver<{}, IWeddingSiteContext> = async (_source, _args, context) => {
    // verify admin auth
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // request stats
    const statsClient = new StatsClient(context.client);
    return statsClient.queryInvitationStats();
}
