
import {ProductsModel} from "../model/products.models.js"

export class ProductRepo {
    static async getItem(){
        const items = await ProductsModel.find({}).lean();
        return items;
    }

    static async createItem(Pname,Pdesc,Pinstock,Pprice,Cid){
        const item = new ProductsModel({
            Pname,
            Pdesc,
            Pinstock,
            Pprice,
            Cid
        });
        return await ProductsModel.create(item);
    }
}