import { Request, Response } from "express";
import { PanierManager } from "../../Domain/Domain_services/Managers/panierManager";

export class PanierController {

    public createPanier(req: Request, res: Response) {
        const panierManager : PanierManager = new PanierManager();
        panierManager.createPanier(req,res);
    }

    public getAllPanier(req: Request, res: Response) {
        const panierManager : PanierManager = new PanierManager();
        panierManager.getAllPanier(req,res);
    }

}