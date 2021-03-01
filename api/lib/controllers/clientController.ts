import { Request, Response } from "express";
import { ClientManager } from "../../Domain/Domain_services/Managers/clientManager";

export class ClientController {

    public createClient(req: Request, res: Response) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.createClient(req,res);
    }

    public getAllClient(req: Request, res: Response) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.getAllClient(req,res);
    }

    public deleteClient(req: Request, res: Response) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.deleteClient(req,res);
    }
}