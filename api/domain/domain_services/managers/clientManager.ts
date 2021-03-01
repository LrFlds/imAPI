/**
 * Subject : Contains methods for Clients
 * Author : Laura Fialdès
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







    }