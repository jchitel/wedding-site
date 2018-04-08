export const typeDef = `
# Various statistics about the current state of guests.
# The number not yet responded can be computed by subtracting
# the number attending and not attending from the number invited.
type GuestRsvpStats {
    # Total invited
    numInvited: Integer!
    # Total attending
    numAttending: Integer!
    # Total not attending
    numNotAttending: Integer!
}

# Invitation-level statistics
type InvitationStats {
    # Total number of invitations sent
    numInvitations: Integer!
    # Total number of invitations with a response (including verbal or by mail)
    numInvitationsResponded: Integer!
}
`;
