import { IFieldResolver } from "graphql-tools";
import { IWeddingSiteContext } from "./schema";
import { Invitation } from "../data/invitation";
import GuestClient, { Guest as IGuest } from "../data/guest";
import AuthClient from "../data/auth";

export const typeDef = `
# A single guest record.
# This can be retrieved only from an Invitation.
# All guests have a status and a 'givenPlusOne' flag.
# If 'givenPlusOne' is true, then the plus one record will be present.
type Guest {
    # Unique id given to each guest
    guestId: Int!
    # First name of guest (properly cased)
    firstName: String!
    # Last name of guest (properly cased)
    lastName: String!
    # Nicknames
    nicknames: [String!]!
    # Current RSVP status of this guest
    status: RsvpStatus!
    # Whether this guest was given a plus one
    givenPlusOne: Boolean!
    # Container for the guest's plus one info, will only be non-null if the guest is taking a plus one
    plusOne: PlusOne
    # Guest's meal choice
    mealChoice: RsvpMeal!
    # Label for who the guest belongs to: bride or groom
    whoseGuest: GuestOwner!
    # Label for the type of guest
    guestType: GuestType!
    # Last updated timestamp (just by the guest, admin updates will have no effect on this)
    lastUpdatedByGuestTimestamp: String
    # Last updated by admin timestamp (guest updates will have no effect on this)
    lastUpdatedByAdminTimestamp: String
}

# A guest's plus one, only if they were given one
type PlusOne {
    # Whether the plus one was taken
    taken: Boolean!
    # First name of the plus one, only if it was taken
    firstName: String
    # Last name of the plus one, only if it was taken
    lastName: String
    # Plus One's meal choice
    mealChoice: RsvpMeal
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

# The meal choice of a guest/plus one
enum RsvpMeal {
    # No meal was chosen, the guest is opting out of a dinner choice
    NO_MEAL
    # Beef short rib
    BEEF
    # Sage chicken
    CHICKEN
    # Salmon
    SALMON
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

/** RsvpMeal enum resolver */
export const RsvpMeal = {
    NO_MEAL: 'no_meal',
    BEEF: 'beef',
    CHICKEN: 'chicken',
    SALMON: 'salmon'
};

export const invitationGuests: IFieldResolver<Invitation, IWeddingSiteContext> = async (source, _args, context) => {
    const invitationId = source.invitationId;
    const guestClient = new GuestClient(context.client);
    return guestClient.queryByInvitationId(invitationId);
}

export const nicknames: IFieldResolver<IGuest, IWeddingSiteContext> = async (source, _args, context) => {
    const guestId = source.guestId;
    const guestClient = new GuestClient(context.client);
    return guestClient.queryGuestNicknames(guestId);
}

export const setRsvpStatus: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // any user can set rsvp status as long as they are authorized
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);

    // set dat status
    const guestClient = new GuestClient(context.client);
    return claims.isAdmin
        ? guestClient.updateRsvpStatusAdmin(args.guestId, args.status)
        : guestClient.updateRsvpStatusGuest(args.guestId, args.status);
}

export const setMealChoice: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // any user can set meal choice as long as they are authorized
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);

    // set dat meal choice
    const guestClient = new GuestClient(context.client);
    return claims.isAdmin
        ? guestClient.updateMealChoiceAdmin(args.guestId, args.choice)
        : guestClient.updateMealChoiceGuest(args.guestId, args.choice);
}

export const setPlusOneStatus: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // any user can set plus one status as long as they are authorized
    const authClient = new AuthClient(context.client);
    const claims = authClient.authorize(context.token);

    // set dat plus one status
    const guestClient = new GuestClient(context.client);
    return claims.isAdmin
        ? guestClient.updatePlusOneStatusAdmin(args.guestId, args.taking, args.firstName, args.lastName, args.mealChoice)
        : guestClient.updatePlusOneStatusGuest(args.guestId, args.taking, args.firstName, args.lastName, args.mealChoice);
}

export const addGuest: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // only admin can add guests
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // add dat guest
    const guestClient = new GuestClient(context.client);
    const { invitationId, firstName, lastName, plusOne, owner, type } = args;
    const guest = await guestClient.insertGuest(invitationId, firstName, lastName, plusOne, owner, type);
    return { guest };
}

export const editGuest: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // only admin can edit guests
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // edit dat guest
    const guestClient = new GuestClient(context.client);
    const { guestId, firstName, lastName, plusOne, owner, type } = args;
    const guest = await guestClient.updateGuest(guestId, firstName, lastName, plusOne, owner, type);
    return { guest };
}

export const deleteGuest: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // only admin can delete guests
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // delete dat guest
    const guestClient = new GuestClient(context.client);
    return guestClient.deleteGuest(args.guestId);
}

export const addNickname: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // only admin can add nicknames
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // add dat nickname
    const guestClient = new GuestClient(context.client);
    await guestClient.insertNickname(args.guestId, args.name);
    return args.name as string;
}

export const removeNickname: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    // only admin can remove nicknames
    const authClient = new AuthClient(context.client);
    authClient.authorizeAdmin(context.token);

    // remove dat nickname
    const guestClient = new GuestClient(context.client);
    await guestClient.deleteNickname(args.guestId, args.name);
    return args.name as string;
}

export const addGuestToInvitation: IFieldResolver<{ invitation: Invitation }, IWeddingSiteContext> = async (source, args, context) => {
    // add dat guest
    const guestClient = new GuestClient(context.client);
    const { firstName, lastName, plusOne, owner, type } = args;
    const guest = await guestClient.insertGuest(source.invitation.invitationId, firstName, lastName, plusOne, owner, type);
    return { guest };
}

export const removeGuestFromInvitation: IFieldResolver<{ invitation: Invitation }, IWeddingSiteContext> = async (_source, args, context) => {
    // remove dat guest
    const guestClient = new GuestClient(context.client);
    return guestClient.deleteGuest(args.guestId);
}

export const addNicknameToGuest: IFieldResolver<{ guest: IGuest }, IWeddingSiteContext> = async (source, args, context) => {
    // add dat nickname
    const guestClient = new GuestClient(context.client);
    await guestClient.insertNickname(source.guest.guestId, args.name);
    return args.name;
}

export const removeNicknameFromGuest: IFieldResolver<{ guest: IGuest }, IWeddingSiteContext> = async (source, args, context) => {
    // remove dat nickname
    const guestClient = new GuestClient(context.client);
    guestClient.deleteNickname(source.guest.guestId, args.name);
    return args.name;
}

export const Guest = {
    nicknames
};
