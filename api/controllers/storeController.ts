import { Request, Response } from "express";
import { StoreManager } from "../domain/domain_services/managers/storeManager";

export class StoreController {

    public createStore(req: Request, res: Response) {
        const storeManager : StoreManager = new StoreManager();
        storeManager.createStore(req,res);
    }


}