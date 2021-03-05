import { PanierController } from "../controllers/panierController";



export class RoutePanier {
    public baseUrl: string = "/panier";
    public panierController : PanierController = new PanierController();
    public panierRoutes(app): void {
        app.route(this.baseUrl + "/create").post(this.panierController.createPanier); 
        app.route(this.baseUrl + "/getAll").get(this.panierController.getAllPanier);
        app.route(this.baseUrl + "/delete").post(this.panierController.deletePanier);

    }
}