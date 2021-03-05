import { Request, Response } from "express";
import { StoreManager } from "../../Domain/Domain_services/Managers/storeManager";

export class StoreController {

    public createStore(req: Request, res: Response) {
        const storeManager : StoreManager = new StoreManager();
        storeManager.createStore(req,res);
    }

    public deleteStore(req: Request, res: Response) {
        const storeManager : StoreManager = new StoreManager();
        storeManager.deleteStore(req,res);
    }

    public getAllStore(req: Request, res: Response) {
        const storeManager : StoreManager = new StoreManager();
        storeManager.getAllStore(req,res);
    }

}