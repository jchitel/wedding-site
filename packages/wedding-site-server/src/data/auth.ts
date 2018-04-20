import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import SqlClient from './sql-client';
import InvitationClient from './invitation';
import { ErrorCode, JwtClaims } from 'wedding-site-shared';


const weddingDateSeconds = new Date('2018-06-23T00:00:00.000Z').getTime() / 1000;
const jwtSignOptions = {
    issuer: 'jake-megan-wedding-rsvp-server',
    audience: 'jake-megan-wedding-rsvp-client',
    algorithm: 'HS256',
};
const jwtVerifyOptions = {
    issuer: jwtSignOptions.issuer,
    audience: jwtSignOptions.audience,
    algorithms: [jwtSignOptions.algorithm]
}

export interface Claims {
    name: string;
    isAdmin: boolean;
    invitationId?: number;
}

export default class AuthClient {
    private invitationClient: InvitationClient;

    constructor(sqlClient: SqlClient) {
        this.invitationClient = new InvitationClient(sqlClient);
    }

    /**
     * Given an unauthenticated user, authenticate them using an invitee name (first, last, or full)
     * and the house number from the invite, returning a JWT for use in subsequent requests.
     * This mechanism is also used to authenticate the admin user.
     */
    async authenticate(name: string, houseNumber: string) {
        // first check for admin credentials
        if (name === 'admin' && houseNumber === process.env.JWT_SECRET) {
            return jwt.sign({
                name: 'admin',
                [JwtClaims.IsAdmin]: true
            }, process.env.JWT_SECRET, {
                ...jwtSignOptions,
                subject: 'admin',
                jwtid: crypto.randomBytes(16).toString('base64')
            });
        }

        // not admin, check against database
        const matches = await this.invitationClient.queryByNameAndHouseNumber(name, houseNumber);
        if (matches.length === 0) {
            // not a single match
            throw new Error(JSON.stringify({ errorCode: ErrorCode.NO_AUTH_RECORD_FOUND }));
        } else if (matches.length > 1) {
            // multiple matches, weird case (THIS SHOULD NOT HAPPEN)
            throw new Error(JSON.stringify({ errorCode: ErrorCode.DUPLICATE_AUTH_RECORDS_FOUND }));
        } else {
            // single match, this is the expected case
            const match = matches[0];
            return jwt.sign({
                name: match.invitationName,
                [JwtClaims.IsAdmin]: false,
                [JwtClaims.InvitationId]: match.invitationId
            }, process.env.JWT_SECRET!, {
                ...jwtSignOptions,
                subject: match.invitationName,
                jwtid: crypto.randomBytes(16).toString('base64'),
                expiresIn: (weddingDateSeconds - (Date.now() / 1000))|0 // expires the day of the wedding
            });
        }
    }

    /**
     * Given an authenticated user, authorize them by validating the token
     * sent in the request header, returning the auth information (whether the
     * user is the admin, and the invitation id if they are not the admin).
     * The JWT logic will throw an error if the token cannot be verified,
     * which should be forwarded to the client, but NOT exposed to the user.
     */
    authorize(token: string): Claims {
        // validate the jwt
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!, jwtVerifyOptions) as any;
            return {
                name: payload.name as string,
                isAdmin: payload[JwtClaims.IsAdmin] as boolean,
                invitationId: payload[JwtClaims.InvitationId] as number | undefined
            };
        } catch (err) {
            throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED, error: err.toString() }));
        }
    }

    authorizeAdmin(token: string): Claims {
        const claims = this.authorize(token);
        if (!claims.isAdmin) throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED, error: 'Not admin' }));
        return claims;
    }

    authorizeGuest(token: string): Claims {
        const claims = this.authorize(token);
        if (claims.isAdmin) throw new Error(JSON.stringify({ errorCode: ErrorCode.NOT_AUTHORIZED, error: 'Not guest' }));
        return claims;
    }
}
