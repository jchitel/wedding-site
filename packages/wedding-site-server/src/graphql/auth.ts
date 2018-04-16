import { IFieldResolver } from 'graphql-tools';
import { IWeddingSiteContext } from './schema';
import AuthClient from '../data/auth';


export const rootAuth: IFieldResolver<{}, IWeddingSiteContext> = async (_source, args, context) => {
    const { name, houseNumber } = args;
    const authClient = new AuthClient(context.client);
    return authClient.authenticate(name, houseNumber);
};
