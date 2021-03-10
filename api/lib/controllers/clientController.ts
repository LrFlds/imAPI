import { Request, Response, NextFunction  } from "express";
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

    public login(req: Request, res: Response) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.login(req,res);
    }

    public deleteClient(req: Request, res: Response) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.deleteClient(req,res);
    }

    public updateClientPassword(req: Request, res: Response) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.updateClientPassword(req,res);
    }

    public verifToken(req: Request, res: Response, next: NextFunction) {
        const clientManager : ClientManager = new ClientManager();
        clientManager.verifToken(req,res, next);
    }
}