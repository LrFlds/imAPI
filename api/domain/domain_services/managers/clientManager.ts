/**
 * Subject : Contains methods for Clients
 * Author : Laura Fialdès / Gladys Akela
 * Date : 18/02/2021
 */



import clientModel from "../Models/clientModel";
import { DbConnection } from "../../Data/dbConnection";
import { CryptPassword } from "../schema_services/cryptPassword";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class ClientManager {

    private instance = DbConnection.getInstance();
    private connection = this.instance.connectMongo();

    /*
     * Creation new client
    */

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

        /*
        * Get all clients in array
        */

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

          /**
           * Login client
           */

          public async login(req, res) {
            if (req.body.Email) {
                const clientByEmail = await clientModel.findOne({Email: req.body.Email});
                if (clientByEmail != undefined) {
                  if (req.body.Password) {
                    await bcrypt.compare(req.body.Password, clientByEmail.Password, (err, same) => {
                      if (err) {
                        res.status(500).send({ message: "Une erreur est survenue, veuillez vérifier que tous les champs sont correctement remplis. Si l'erreur persiste, veuillez contacter votre administrateur" });
                      }else if (same) {
                        clientByEmail.save((err, user) => {
                          if (err) {
                            res.status(500).send("Une erreur est survenue lors de la connexion");
                          } else {
                            const token = jwt.sign(clientByEmail._id.toJSON(), process.env.SECRET_TOKEN_ACCESS);
                            res.status(200).send({ accessToken: token });
                          }
                        })
                      } else {
                        res.status(400).send({ message: "La comparaison de mot de passe a échoué, êtes vous sûr d'avoir rentré le bon ?" });
                      }
                    })
                  } else {
                    res.status(400).send({ message: "Veuillez entrer un mot de passe" });
                  }
                } else {
                  res.status(401).send({ message: "Pas d'utilisateur connu avec cette adresse mail" });
                }
              }
            }

          /**
           * check tokens for client
           */


          public  deleteClient(req,res){
            const Clients = clientModel.findOne({ Email: req.body.Email })
            if (Clients == null) {
                res.status(400).send({ message: "L'utilisateur n'existe pas" })
            }else {
                Clients.deleteOne((err, Clients)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.status(200).send('Utilisateur supprimé avec succés')
                    }
                })
            }
          }
        

          public async updateClient(req,res){

            const Clients = await clientModel.findById(req.params.id)
                    if(req.body.Password != null && req.body.NewPassword && req.body.Password !="" && req.body.Password != req.body.NewPassword){
                        await bcrypt.compare(req.body.Password, Clients.Password, (err, match) => {
                            if(err){
                                res.send('Mot depasse éronné')
                            }else{
                                Clients.updateOne({Password: req.body.NewPassword}).then().catch(error => {
                                    console.log(error)
                                })
                            }
                        })
                    }
                    if (req.body.Email != null && req.body.NewEmail != null && req.body.Email != req.body.NewEmail && req.body.NewEmail != ""){
                        await bcrypt.compare(req.body.Password, Clients.Password, (err, match) => {
                            if (err) {
                                console.log(err)
                            } else {
                                Clients.updateOne({ Email: req.body.NewMail }).then().catch(error => {
                                    console.log(error)
                                })
                            }
                        })
                    }
                    if(req.body.Name != null && req.body.NewName != null && req.body.Name != req.body.NewName && req.body.NewName != ""){
                        Clients.updateOne({ Name: req.body.NewName }).then().catch(error => {
                            console.log(error)
                        })
                    }
                    if(req.body.FirstName != null && req.body.NewFirstName != null && req.body.FirstName != req.body.NewFirstName && req.body.NewFirstName != ""){
                        Clients.updateOne({ FirstName: req.body.NewFirstName }).then().catch(error => {
                            console.log(error)
                        })
                    }
                    if(req.body.Panier != null && req.body.NewPanier != null && req.body.Panier != req.body.NewPanier && req.body.NewPanier != ""){
                        Clients.updateOne({ Panier: req.body.NewPanier }).then().catch(error => {
                            console.log(error)
                        })
                }
            }

        }
        
    
            
        





    