import { Document} from "mongoose";


export interface IPanier extends Document {

    Reference: String,
    Products: String,
    Dispo: Boolean, 
    Price:  Number, 
    Quantity: Number, 
}