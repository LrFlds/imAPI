import { StoreController } from "../controllers/storeController";



export class RouteStore {
    public baseUrl: string = "/pro";
    public storeController : StoreController = new StoreController();
    public storeRoutes(app): void {
        app.route(this.baseUrl + "/create").post(this.storeController.createStore);
        app.route(this.baseUrl + "/delete").post(this.storeController.deleteStore);
        app.route(this.baseUrl + "/getStore").post(this.storeController.getAllStore);
    }
}