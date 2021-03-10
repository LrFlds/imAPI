import * as express from "express";
import { RouteClient } from "../lib/routes/clientRoute"
import{ RoutePanier} from "../lib/routes/panierRoute"
import{ RouteStore} from "../lib/routes/storeRoute"






class App {
    public app: express.Application;
    public routeClt: RouteClient = new RouteClient();
    public routePanier: RoutePanier = new RoutePanier();
    public routeStore: RouteStore = new RouteStore();


    constructor(){
        this.app = express();
        this.config();
        this.routeClt.clientRoutes(this.app);
        this.routePanier.panierRoutes(this.app);
        this.routeStore.storeRoutes(this.app);
        
    }
    private config(): void{
        this.app.use(express.json());
        this.app.use((req, res, next)=>{
            res.setHeader("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept")
            res.setHeader("Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS")
            next()
        })
    


    }
}

export default new App().app;