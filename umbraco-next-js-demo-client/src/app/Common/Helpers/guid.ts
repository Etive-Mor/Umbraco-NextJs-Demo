

/**
 * Tests that something is a valid guid
 * @param input 
 * @returns 
 */
export function isValidGuid(input: string): boolean {
    if (!(/^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/).test(input)) {
        return false;
    }
    return true;
}

/**
 * Returns true if input is a valid guid, otherwise throws an error
 * 
 * 
 * @param input 
 * @seeAlso isValidGuid()
 */
export function errorIfNotValidGuid(input: string): boolean {
    if (isValidGuid(input)) {
        return true;
    }
    throw new Error(`Value must be a valid guid, received '${input}'`);
}