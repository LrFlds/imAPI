import { Request, Response, NextFunction  } from "express";
import { ClientManager } from "../Domain/Domain_services/Managers/clientManager";

export class ClientController {

    clientManager : ClientManager = new ClientManager();

    public createClient = (req: Request, res: Response) => {
        this.clientManager.createClient(req,res);
    }

    public getAllClient = (req: Request, res: Response) => {
        this.clientManager.getAllClient(req,res);
    }

    public login = (req: Request, res: Response) => {
        this.clientManager.login(req,res);
    }

    public deleteClient = (req: Request, res: Response) => {
        this.clientManager.deleteClient(req,res);
    }

    public updateClientPassword = (req: Request, res: Response) => {
        this.clientManager.updateClientPassword(req,res);
    }

    public verifToken = (req: Request, res: Response, next: NextFunction) => {
        this.clientManager.verifToken(req,res, next);
    }
}