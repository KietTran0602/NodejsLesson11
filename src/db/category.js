
import {CategoryModel} from "../model/catagory.models.js"

export class CategoryRepo {
    static async getItem(){
        const items = await CategoryModel.find({}).lean();
        return items;
    }

    static async createItem(Cname){
        const item = new CategoryModel({
            Cname
        });
        return await CategoryModel.create(item);
    }
}