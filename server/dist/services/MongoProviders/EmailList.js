"use strict";
// import logger from "../../lib/logger";
// import { EmailList, EmailListDocument } from "../../models/EmailList";
// import { findByQuery } from "./common";
// export async function getPageToken(googleId: string) {
//   logger.info("[Inside getPageToken]");
//     const [error, response] = await findByQuery<EmailListDocument>(
//         EmailList,
//         {
//             googleId: googleId,
//         },
//         { createdAt: -1 }
//     );
//     if (error) {
//         return [error];
//     }
//     if (Array.isArray(response)) {
//         return [null, response[0].pageToken];
//     } else {
//         return [null, response.pageToken];
//     }
// }
