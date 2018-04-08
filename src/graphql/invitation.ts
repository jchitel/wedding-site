import { invitationGuests } from './guest';
import { IFieldResolver } from 'graphql-tools';
import { IWeddingSiteContext } from './schema';

export const typeDef = `
# The collection of guests on a single invitation.
# This can be looked up using any of the guest's names,
# and the house number from the address.
type Invitation {
    # Unique id given to each invitation
    invitationId: String!
    # Address info for invitation
    address: Address
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

// rootInvitation, allInvitations, byInvitationId, byNameAndHouseNumber

export const rootInvitation: IFieldResolver<{}, IWeddingSiteContext> = (source, args, context) => {
    
}
