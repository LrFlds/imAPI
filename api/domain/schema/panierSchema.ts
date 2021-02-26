import * as mongoose from "mongoose";

export const PanierSchema : mongoose.Schema = new mongoose.Schema({
    
    Products: [{ type: String, required: true }],
    Dispo: { type: Boolean, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true }

})
