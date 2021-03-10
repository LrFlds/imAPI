import { StoreController } from "../../controllers/storeController";



export class RouteStore {
    public baseUrl: string = "/store";
    public storeController : StoreController = new StoreController();
    public storeRoutes(app): void {
        app.route(this.baseUrl + "/create").post(this.storeController.createStore);
    }
}