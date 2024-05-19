import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const schema1 = new mongoose.Schema({
    Pname: String,
    Pdesc: String,
    Pinstock: Number,
    Pprice: Number,
    Cid: {
        type: mongoose.Types.ObjectId
    },
    imgUrl:{
        type: String
    }
});

export const ProductsModel = mongoose.model("Product", schema1,"product");