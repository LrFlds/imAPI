/**
 * Subject : Contains methods for Magasin
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import storeModel from "../Models/storeModel";
import { DbConnection } from "../../Data/dbConnection";
import { CryptPassword } from "../schema_services/cryptPassword";

export class StoreManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    public async createStore(req,res) {
        const storeExist = await storeModel.findOne({Email:req.body.Email})
            if (storeExist != null) {
                res.status(400).send({ message: 'Utilisateur déjà enregistré avec cet Email' })
            } else {
                const newStore = new storeModel({
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Panier: req.body.Panier
                })
                CryptPassword.hashPassword(req.body.Password, 10, (err, hash) => {
                    if (err) {
                        res.send(err)
                    } else {
                        newStore.Password = hash;
                        newStore.save((err, user) => {
                            if (err) {
                                res.send(err)
                            } else {
                                res.sendStatus(201)
                            }
                        })
                    }
                })
               
            }
        }
        

            public  deleteStore(req,res){
                const Stores = storeModel.findOne({ Email: req.body.Email })
                if (Stores == null) {
                    res.status(400).send({ message: 'Magasin déjà supprimé' })
                }else {
                   
                    Stores.remove((err,Stores)=>{
                        if(err){
                            res.send(err)
                        }else{
                            res.sendStatus(200)
                        }
                    })
                }
              }
                


}