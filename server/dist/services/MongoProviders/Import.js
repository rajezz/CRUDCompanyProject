"use strict";
// import util from "util";
// import logger from "../../lib/logger";
// import { asyncWrapper } from "../../lib/utils";
// import { Import, ImportDocument } from "../../models/Import";
// import { updateOrUpsert } from "./common";
// import { ImportActionStatusType, importActionStatuses } from "../../_data/import";
// export async function incrementEmailCount(property: string, googleId: string, increment: number) {
//     const [error, result] = await asyncWrapper(
//         Import.updateOne({ googleId: googleId }, { $inc: { [property]: increment } })
//     );
//     if (error) {
//         logger.error(
//             `EmailList: Error while incrementing ${property} > ${util.inspect(error, true, 3)}`
//         );
//         return false;
//     }
//     logger.debug(
//         `EmailList: Successfully incremented ${property} > ${util.inspect(result, true, 3)}`
//     );
//     return true;
// }
// export async function updateStatus(action: ImportActionStatusType, googleId: string) {
//     logger.info("[Inside updateStatus]");
//     const [error, result] = await asyncWrapper(
//         updateOrUpsert<ImportDocument>(Import, { googleId }, importActionStatuses[action])
//     );
//     if (error) {
//         return error;
//     }
//     logger.info(`Updated Import doc: ${util.inspect(result, false, 2)}`);
//     return null;
// }
