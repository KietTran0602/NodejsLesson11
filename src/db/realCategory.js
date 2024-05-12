
import {RcategorysModel} from "../model/realCategory.models.js"

export class RcategoryRepo {
    static async getItem(){
        const items = await RcategorysModel.find({}).lean();
        return items;
    }

    static async createItem(Pname,Pdesc,Pinstock,Pprice,Cid){
        const item = new RcategorysModel({
            RCname
        });
        return await RcategorysModel.create(item);
    }
}