/**
 * Subject : Contains model for Manager Clients
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import * as mongoose from "mongoose";
import { ClientSchema } from "../../schema/clientSchema";
import { IClient } from "../../../IDomain/IClient"


export default mongoose.model<IClient>("Client", ClientSchema);