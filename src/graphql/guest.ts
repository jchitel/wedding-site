export const typeDef = `
# A single guest record.
# This can be retrieved only from an Invitation.
# All guests have a status and a 'givenPlusOne' flag.
# If 'givenPlusOne' is true, then the plus one record will be present.
type Guest {
    # Unique id given to each guest
    guestId: String!
    # First name of guest (properly cased)
    firstName: String!
    # Last name of guest (properly cased)
    lastName: String!
    # Current RSVP status of this guest
    status: RsvpStatus!
    # Whether this guest was given a plus one
    givenPlusOne: Boolean!
    # Container for the guest's plus one info, will only be non-null if the guest is taking a plus one
    plusOne: PlusOne
    # Label for who the guest belongs to: bride or groom
    whoseGuest: GuestOwner!
    # Label for the type of guest
    guestType: GuestType!
    # Last updated timestamp (just by the user, admin updates will have no effect on this)
    lastUpdatedByUser: String!
    # Last updated by admin timestamp (user updates will have no effect on this)
    lastUpdatedByAdmin: String!
}

# A guest's plus one, only if they were given one
type PlusOne {
    # Whether the plus one was taken
    taken: Boolean!
    # First name of the plus one, only if it was taken
    firstName: String
    # Last name of the plus one, only if it was taken
    lastName: String
}

# The RSVP status of a guest
enum RsvpStatus {
    # The guest has not yet responded as to whether they are attending
    NO_RSVP
    # The guest has responded that they are attending
    ATTENDING
    # The guest has responsed that they are not attending
    NOT_ATTENDING
}

# The spouse that a guest "belongs" to.
# This serves only to identify who is responsible for the guest.
enum GuestOwner {
    # The bride either knew the guest first, or the guest was met through the bride
    BRIDE
    # The groom either knew the guest first, or the guest was met through the groom
    GROOM
}

# The type of a guest, effectively how the guest relates to the bride or groom.
enum GuestType {
    # The guest is a family member
    FAMILY
    # The guest is a friend of the family
    FAMILY_FRIEND
    # The guest is a friend of the bride or groom
    FRIEND
    # The guest is in the wedding party
    PARTY
}
`;

/** RsvpStatus enum resolver */
export const RsvpStatus = {
    NO_RSVP: 'no_rsvp',
    ATTENDING: 'attending',
    NOT_ATTENDING: 'not_attending'
};

/** GuestOwner enum resolver */
export const GuestOwner = {
    BRIDE: 'bride',
    GROOM: 'groom'
};

/** GuestType enum resolver */
export const GuestType = {
    FAMILY: 'family',
    FAMILY_FRIEND: 'family_friend',
    FRIEND: 'friend',
    PARTY: 'party'
};
