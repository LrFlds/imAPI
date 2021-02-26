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








    }