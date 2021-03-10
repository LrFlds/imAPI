import { Document} from "mongoose";


export interface IPanier extends Document {

    Reference: String,
    Products: Array<String>,
    Dispo: Boolean, 
    Price:  Number, 
    Quantity: number, 
}