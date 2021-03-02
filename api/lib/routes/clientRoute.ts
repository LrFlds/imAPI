import { ClientController } from "../controllers/clientController";



export class RouteClient {
    public baseUrl: string = "/client";
    public clientController : ClientController = new ClientController();
    public clientRoutes(app): void {
        app.route(this.baseUrl + "/create").post(this.clientController.createClient);
        app.route(this.baseUrl + "/getAll").get(this.clientController.getAllClient);
        app.route(this.baseUrl + "/login").post(this.clientController.login);
        app.route(this.baseUrl + "/delete").post(this.clientController.deleteClient);
        app.route(this.baseUrl + "/update").post(this.clientController.updateClient);
    }
}