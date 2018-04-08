import { setRsvpStatus, setPlusOneStatus } from './guest';


export const typeDef = `
# Top-level Mutation type
type Mutation {
    # Sets the RSVP status of a specific guest by id.
    setRsvpStatus(guestId: String, status: RsvpStatus): Guest

    # Sets the plus one status of a specific guest by id.
    setPlusOneStatus(guestId: String, status: RsvpStatus, firstName: String!, lastName: String!): Guest
}
`;

/** Every Mutation field needs a resolver because it's top level */
export const Mutation = {
    setRsvpStatus,
    setPlusOneStatus
};
