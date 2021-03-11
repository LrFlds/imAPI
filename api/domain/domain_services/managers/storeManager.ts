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

    public async createStore(req, res) {
        const storeExist = await storeModel.findOne({ Email: req.body.Email })
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
    public async getAllStore(req, res) {
        const Stores = await storeModel.find({})
        const viewStores = []
        for (let store of Stores) {
          const viewStore = {
            Name: store.Name,
            Panier: store.Panier,
            Id: store._id
          }
          viewStores.push(viewStore)
        }
        res.status(200).send(viewStores)
      }


    public deleteStore(req, res) {
        const Stores = storeModel.findOne({ Email: req.body.Email })
        if (Stores == null) {
            res.status(400).send({ message: 'Magasin déjà supprimé' })
        } else {

            Stores.remove((err, Stores) => {
                if (err) {
                    res.send(err)
                } else {
                    res.sendStatus(200)
                }
            })
        }
    }

    public async updateStore(req, res) {
        if (req.body.Email != undefined && req.body.Email != null) {
            const store = await storeModel.findOne({ Email: req.body.Email })
            if (store == null) {
                res.status(400).send({ message: "le magasin n'existe pas" })
            } else if (req.body.NewEmail != undefined && req.body.NewEmail != null && req.body.NewEmail != "") {
                await bcrypt.compare(req.body.Password, store.Password, (err, match) => {
                    if (err) {
                        res.status(400).send({ message: "le mot de passe ne correspond pas au mot de passe de l email du magasin" })
                    } else if (match == true) {
                        store.updateOne({ Email: (req.body.NewMail) }, { new: true }, (err, newStore) => {
                            if (err) {
                                res.status(400).send({ message: " " })
                            } else {
                                res.status(200).send({ message: "la mise à jour a bien été effectuée" })
                            }
                        })
                    } else {
                        res.status(400).send({ message: "la mise à jour ne peut etre effectué car les mots de passe ne correspondent pas" })
                    }
                })
            }

            if (req.body.Name != null && req.body.NewName != null && req.body.Name != req.body.NewName && req.body.NewName != "") {
                store.updateOne({ Name: (req.body.NewName) }, { new: true }, (err, newStore) => {
                    if (err) {
                        res.status(400).send({ message: "le nouveau nom est incorrect" })
                    } else {
                        res.status(200).send({ message: "la mise à jour a bien été effectuée" })
                    }
                })
            }

            if (req.body.Name != null && req.body.NewPassword != null && req.body.Password != req.body.NewPassword && req.body.NewPassword != "") {
                await bcrypt.compare(req.body.Password, store.Password, (err, match) => {
                    if (err) {
                        res.send('Mot depasse éronné')
                    } else {

                        store.updateOne({ Name: (req.body.NewPassword) }, { new: true }, (err, newStore) => {
                            if (err) {
                                res.status(400).send({ message: "le nouveau nom est incorrect" })
                            } else {
                                res.status(200).send({ message: "la mise à jour a bien été effectuée" })
                            }
                        })
                    }
                })
            }
        }



    }

}

