import mongoose from "mongoose";

const schema1 = new mongoose.Schema({
    name: String
});

export const CategoryModel = mongoose.model("Category", schema1,"category");