/** Error codes for determining client behavior when HTTP status code is not enough */
export const enum ErrorCode {
    /** Credentials did not match any current records */
    NO_AUTH_RECORD_FOUND,
    /** There was more than one credential match (this shouldn't happen, but we have to be open to the possibility) */
    DUPLICATE_AUTH_RECORDS_FOUND,
    /** The provided auth token failed validation */
    NOT_AUTHORIZED,
    /** The requested query yielded no records */
    NO_RECORDS_FOUND,
    /** The requested query yielded duplicate records */
    DUPLICATE_RECORDS_FOUND
}
