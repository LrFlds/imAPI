/**
 * Subject : Contains methods for Magasin
 * Author : Laura Fialdès
 * Date : 26/02/2021
 */

import storeModel from "../Models/storeModel";
import { DbConnection } from "../../Data/dbConnection";
import { CryptPassword } from "../schema_services/cryptPassword";
import * as bcrypt from "bcrypt";
import { match } from "node:assert";

export class StoreManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    public async createStore(req,res) {
        const storeExist = await storeModel.findOne({Email:req.body.Email})
            if (storeExist != null) {
                res.status(400).send({ message: 'Magasin déjà enregistré avec cette adresse mail' })
            } else {
                const newStore = new storeModel({
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    Panier: req.body.Panier
                    
                })
                newStore.save((err,newPro)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send("Magasin enregistré" + newStore)
                    }
                })
                    
                }
               
            }
        

            public  deleteStore(req,res){
                const Stores = storeModel.findOne({ Email: req.body.Email })
                if (Stores == null) {
                    res.status(400).send({ message: 'client déjà supprimé' })
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
   
             public async updateStore(req,res){
                if(req.body.Email != undefined && req.body.Email !=null ){
                    const store= await storeModel.findOne({Email:req.body.Email})
                    if(store == null){
                        res.status(400).send({message:"le magasin n'existe pas"})
                        }else if(req.body.NewEmail != undefined && req.body.NewEmail != null && req.body.NewEmail!=""){
                            await bcrypt.compare(req.body.Password,store.Password,(err,match)=>{
                                if (err) {
                                    res.status(400).send({message:"le mot de passe ne correspond pas au mot de passe de l email du magasin"})
                                } else  if (match==true){
      
                                    store.updateOne({ Email: (req.body.NewMail )},{new:true},(err,newStore) => {
                                        if (err) {
                                            res.status(400).send({message:"le nouveau email est incorrect"})
                                        }else{
                                            res.status(200).send({message:"la mise à jour a bien été effectuée"})
                                        }
                                    })
                                }else{
                                    res.status(400).send({message:"la mise à jour ne peut etre effectué car les mots de passe ne correspondent pas"})
                                }
                            })
                        }
                }
                
             }


}







