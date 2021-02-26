/**
 * Subject : Contains methods for Products
 * Author : Laura Fialdès / Gladys Akela
 * Date : 22/02/2021
 */

import panierModel from "../Models/panierModel";
import { DbConnection } from "../../Data/dbConnection";


export class PanierManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    // Panier création
    // Back to format JSON

    public async createPanier(req,res) {
        const panierExist = await panierModel.findOne({ Reference: req.body.Reference })
            if (panierExist != null) {
                res.status(400).send({ message: 'Panier déjà enregistré avec cette réference' })
            } else {
                const newPanier = new panierModel({
                    Reference: req.body.Reference,
                    Products: req.body.Products,
                    Dispo: req.body.Dispo,
                    Price: req.body.Price,
                    Quantity: req.body.Quantity
                })
                newPanier.save((err,newPanier)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send("Produit créé" + newPanier)
                    }
                })

            }
        }
    
    // Recovery of all products
    // Back to format JSON

    public async  getAllPanier(req, res) {
        const Paniers = await panierModel.find({})
        const viewPaniers = []
        for (let panier of Paniers) {
          const viewPanier = {
            Reference: panier.Reference,
            Products: panier.Products,
            Dispo: panier.Dispo,
            Price: panier.Price,
            Quantity: panier.Quantity,
            Id: panier._id
          }
          viewPaniers.push(viewPanier)
        }
        res.status(200).send(viewPaniers)
      }



    
    


}