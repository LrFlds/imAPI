/**
 * Subject : Contains methods for Clients
 * Author : Laura Fialdès
 * Date : 18/02/2021
 */



import clientModel from "../Models/clientModel";
import { DbConnection } from "../../Data/dbConnection";
import { CryptPassword } from "../schema_services/cryptPassword";


export class ClientManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    public async createClient(req,res) {
        const clientExist = await clientModel.findOne({Email:req.body.Email})
            if (clientExist != null) {
                res.status(400).send({ message: 'Utilisateur déjà enregistré avec cet Email' })
            } else {
                const newClient = new clientModel({
                    Name: req.body.Name,
                    FirstName: req.body.FirstName,
                    Email: req.body.Email,
                    Panier: req.body.Panier
                })
                CryptPassword.hashPassword(req.body.Password, 10, (err, hash) => {
                    if (err) {
                        res.send(err)
                    } else {
                        newClient.Password = hash;
                        newClient.save((err, user) => {
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

        public async getAllClient(req, res) {
            const Clients = await clientModel.find({})
            const viewClients = []
            for (let client of Clients) {
              const viewClient = {
                Name: client.Name,
                FirstName: client.FirstName,
                Email: client.Email,
                Panier: client.Panier,
                Id: client._id
              }
              viewClients.push(viewClient)
            }
            res.status(200).send(viewClients)
          }



          public  deleteClient(req,res){
            const Clients = clientModel.findOne({ Email: req.body.Email })
            if (Clients == null) {
                res.status(400).send({ message: 'client déjà supprimé' })
            }else {
               
                Clients.remove((err,Clients)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.sendStatus(200)
                    }
                })
            }
          }
        

        //   public async updateClient(req:Request,res:Response){

        //     const Clients = await clientModel.find({})

        //         Clients.find({Email: req.body.Email}).then( async (Clients) => {
        //             if(req.body.Password != null && req.body.NewPassword && req.body.Password !="" && req.body.Password != req.body.NewPassword){
        //                 await CryptPassword.compare(req.body.Password, Clients.Password, (err, match) => {
        //                     if(err){
        //                         res.send('Mot depasse éronné')
        //                     }else{
        //                         Clients.updateOne({Password: req.body.NewPassword}).then().catch(error => {
        //                             console.log(error)
        //                         })
        //                     }
        //                 })
        //             }
        //             if (req.body.Email != null && req.body.NewEmail != null && req.body.Email != req.body.NewEmail && req.body.NewEmail != ""){
        //                 await CryptPassword.compare(req.body.Password, Clients.Password, (err, match) => {
        //                     if (err) {
        //                         console.log(err)
        //                     } else {
        //                         Clients.updateOne({ Email: req.body.NewMail }).then().catch(error => {
        //                             console.log(error)
        //                         })
        //                     }
        //                 })
        //             }
        //             if(req.body.Name != null && req.body.NewName != null && req.body.Name != req.body.NewName && req.body.NewName != ""){
        //                 Clients.updateOne({ Name: req.body.NewName }).then().catch(error => {
        //                     console.log(error)
        //                 })
        //             }
        //             if(req.body.FirstName != null && req.body.NewFirstName != null && req.body.FirstName != req.body.NewFirstName && req.body.NewFirstName != ""){
        //                 Clients.updateOne({ FirstName: req.body.NewFirstName }).then().catch(error => {
        //                     console.log(error)
        //                 })
        //             }
        //         })
        //     }

        // }
        // if(req.body.Panier != null && req.body.NewPanier != null && req.body.Panier != req.body.NewPanier && req.body.NewPanier != ""){
        //     Clients.updateOne({ Panier: req.body.NewPanier }).then().catch(error => {
        //         console.log(error)
        //     })
        
    
            
        }





    