// import util from "util";
// import logger from "./logger";

export function asyncWrapper(method: any): Promise<any> {
    return new Promise((resolve) => {
        method
            .then((res: PromiseFulfilledResult<any>) => resolve([null, res]))
            .catch((err: PromiseRejectedResult) => resolve([err, null]));
    });
}

// export function asyncForEach(arr: Array<any>, fn) {
//   try {
//     for (let i = 0; i < arr.length; i++) {


//     }

//   } catch (error) {
//     return [error];
//   }
// }

export { v4 as generateUuid } from "uuid";

/**
 * Reduce the obj into new object containing all the fields represented in the keys argument.
 *
 * @param {*} obj Source Object
 * @param {Array<string>} keys Array of fields to be extracted from obj
 * @return {*}  Trimmed obj
 */
export const trimObject = (obj: any, keys: Array<string>): any => {
    // logger.debug(`obj: ${util.inspect(obj, false, 3, true)}`);
    // logger.debug(`keys: ${util.inspect(keys, false, 3, true)}`);
    return keys.reduce(
        (acc, key) => ({
            ...acc,
            ...(typeof obj[key] != "undefined" ? { [key]: obj[key] } : {}),
        }),
        {}
    );
};

/**
 * Halt the synchronous execution for ms milliseconds.
 *
 * Eg: delayByMS(2000) will halt the execution for 2 seconds.
 * @param {number} ms The number of milliseconds to halt the execution.
 */
export const delayByMS = async (ms: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};
