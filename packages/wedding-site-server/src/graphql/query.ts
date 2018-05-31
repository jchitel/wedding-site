import { rootInvitation, allInvitations, byInvitationId, byNameAndHouseNumber } from './invitation';
import { guestRsvpStats, invitationStats } from './stats';


export const typeDef = `
# Top-level Query type
type Query {
    # Retrieve a user's RSVP according to current authorization.
    # Admin authorization will throw an error.
    rsvp: Invitation!

    # Retrieve all rsvps.
    # ADMIN ONLY
    rsvps: [Invitation!]!

    # Retrieve a specific rsvp by invitation id.
    # This will throw an error for a non-existent invitation.
    # ADMIN ONLY
    rsvpByInvitationId(invitationId: Int!): Invitation!

    # Look up a specific invitation by name and house number.
    # This will return null for an invalid lookup.
    # ADMIN ONLY
    rsvpByNameAndHouseNumber(name: String!, houseNumber: String!): Invitation!

    # Retrieve full guest RSVP statistics.
    # If 'owner' is provided, only that owner's guests will be retrieved.
    # If 'type' is provided, only guests of that type will be retrieved.
    # If 'plusOnes' is set to true, only plus one stats will be retrieved.
    # If 'plusOnes' is set to false, only real guests stats will be retrieved.
    # If 'plusOnes' is omitted, stats for all guests and plus ones will be retrieved.
    # ADMIN ONLY
    guestRsvpStats(owner: GuestOwner, type: GuestType, plusOnes: Boolean): GuestRsvpStats!

    # Retrieve invitation-level statistics.
    # ADMIN ONLY
    invitationStats: InvitationStats!
}
`;

export const Query = {
    rsvp: rootInvitation,
    rsvps: allInvitations,
    rsvpByInvitationId: byInvitationId,
    rsvpByNameAndHouseNumber: byNameAndHouseNumber,
    guestRsvpStats,
    invitationStats
};
