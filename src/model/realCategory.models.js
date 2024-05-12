import mongoose from "mongoose";

const schema1 = new mongoose.Schema({
    RCname: String
});

export const RcategorysModel = mongoose.model("Rcategory", schema1,"rcategory");