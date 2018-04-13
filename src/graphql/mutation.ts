import {
    setRsvpStatus, setPlusOneStatus,
    addGuest, editGuest, deleteGuest,
    addNickname, removeNickname,
    addGuestToInvitation, removeGuestFromInvitation,
    addNicknameToGuest, removeNicknameFromGuest
} from './guest';
import { addInvitation, editInvitation, deleteInvitation } from './invitation';


/**
 * Verification:
 * - setRsvpStatus       VERIFIED
 * - setPlusOneStatus    VERIFIED
 * - addInvitation       VERIFIED
 * - editInvitation      VERIFIED
 * - deleteInvitation    VERIFIED
 * - addGuest            VERIFIED
 * - editGuest           VERIFIED
 * - deleteGuest         VERIFIED
 * - addNickname         VERIFIED
 * - removeNickname      VERIFIED
 * # InvitationMutation
 * - invitation          VERIFIED
 * - addGuest            VERIFIED
 * - removeGuest         VERIFIED
 * # GuestMutation
 * - guest               VERIFIED
 * - addNickname         VERIFIED
 * - removeNickname      VERIFIED
 */
export const typeDef = `
# Top-level Mutation type
type Mutation {
    # Sets the RSVP status of a specific guest by id.
    setRsvpStatus(guestId: Int!, status: RsvpStatus!): Guest!

    # Sets the plus one status of a specific guest by id.
    setPlusOneStatus(guestId: Int!, taking: Boolean!, firstName: String, lastName: String): Guest!

    # Adds a new invitation
    # ADMIN ONLY
    addInvitation(invitationName: String!, houseNumber: String!, streetAddress: String!, aptNumber: String, city: String!, state: String!, zip: String!): InvitationMutation!

    # Edits an invitation
    # ADMIN ONLY
    editInvitation(invitationId: Int!, invitationName: String, houseNumber: String, streetAddress: String, aptNumber: String, city: String, state: String, zip: String): InvitationMutation!

    # Deletes an invitation
    # ADMIN ONLY
    deleteInvitation(invitationId: Int!): Invitation!

    # Adds a guest to an existing invitation
    # ADMIN ONLY
    addGuest(invitationId: Int!, firstName: String!, lastName: String!, plusOne: Boolean!, owner: GuestOwner!, type: GuestType!): GuestMutation!

    # Edits a guest
    # ADMIN ONLY
    editGuest(guestId: Int!, firstName: String, lastName: String, plusOne: Boolean, owner: GuestOwner, type: GuestType): GuestMutation!

    # Deletes a guest
    # ADMIN ONLY
    deleteGuest(guestId: Int!): Guest!

    # Adds a nickname to an existing guest
    # ADMIN ONLY
    addNickname(guestId: Int!, name: String!): String!

    # Removed a nickname from an existing guest
    # ADMIN ONLY
    removeNickname(guestId: Int!, name: String!): String!
}

type InvitationMutation {
    # added invitation
    invitation: Invitation!

    # adds a guest to this added/edited invitation
    addGuest(firstName: String!, lastName: String!, plusOne: Boolean!, owner: GuestOwner!, type: GuestType!): GuestMutation!

    # removes a guest from this added/edited invitation
    removeGuest(guestId: Int!): Guest!
}

type GuestMutation {
    # added guest
    guest: Guest!

    # adds a nickname to this added/edited guest
    addNickname(name: String!): String!

    # removes a nickname to this added/edited guest
    removeNickname(name: String!): String!
}
`;

/** Every Mutation field needs a resolver because it's top level */
export const Mutation = {
    setRsvpStatus,
    setPlusOneStatus,
    addInvitation,
    editInvitation,
    deleteInvitation,
    addGuest,
    editGuest,
    deleteGuest,
    addNickname,
    removeNickname
};

export const InvitationMutation = {
    addGuest: addGuestToInvitation,
    removeGuest: removeGuestFromInvitation
};

export const GuestMutation = {
    addNickname: addNicknameToGuest,
    removeNickname: removeNicknameFromGuest
};
