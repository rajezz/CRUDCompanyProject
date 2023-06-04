"use strict";
// import util from "util";
// import logger from "./logger";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayByMS = exports.trimObject = exports.generateUuid = exports.asyncWrapper = void 0;
function asyncWrapper(method) {
    return new Promise((resolve) => {
        method
            .then((res) => resolve([null, res]))
            .catch((err) => resolve([err, null]));
    });
}
exports.asyncWrapper = asyncWrapper;
// export function asyncForEach(arr: Array<any>, fn) {
//   try {
//     for (let i = 0; i < arr.length; i++) {
//     }
//   } catch (error) {
//     return [error];
//   }
// }
var uuid_1 = require("uuid");
Object.defineProperty(exports, "generateUuid", { enumerable: true, get: function () { return uuid_1.v4; } });
/**
 * Reduce the obj into new object containing all the fields represented in the keys argument.
 *
 * @param {*} obj Source Object
 * @param {Array<string>} keys Array of fields to be extracted from obj
 * @return {*}  Trimmed obj
 */
const trimObject = (obj, keys) => {
    // logger.debug(`obj: ${util.inspect(obj, false, 3, true)}`);
    // logger.debug(`keys: ${util.inspect(keys, false, 3, true)}`);
    return keys.reduce((acc, key) => (Object.assign(Object.assign({}, acc), (typeof obj[key] != "undefined" ? { [key]: obj[key] } : {}))), {});
};
exports.trimObject = trimObject;
/**
 * Halt the synchronous execution for ms milliseconds.
 *
 * Eg: delayByMS(2000) will halt the execution for 2 seconds.
 * @param {number} ms The number of milliseconds to halt the execution.
 */
const delayByMS = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
});
exports.delayByMS = delayByMS;
