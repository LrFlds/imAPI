import { Document} from "mongoose";


export interface IPanier extends Document {
    Products: String,
    Dispo: Boolean, 
    Price:  Number, 
    Quantity: Number, 
}