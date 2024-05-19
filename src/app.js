import express from "express";
import { create as createHandlebarsEngine } from "express-handlebars";
import {connectMongoDb} from "./config.js"
import {CategoryRepo} from "./db/category.js"
import {ProductRepo} from "./db/products.js"
import {RcategoryRepo} from "./db/realCategory.js"
import { RcategorysModel } from "./model/realCategory.models.js";
import {ProductsModel} from "./model/products.models.js"
import multer from 'multer';

const multerUploader = multer({
    // dest: "public/assets/img",
    storage: multer.diskStorage({
        destination:function (req, file, cb) {
            cb(null, 'public/assets/img')
          },
        filename: function (req, file, cb) {
            const originalName = file.originalname;
            const [name, ext]= originalName.split(".");
            const filename = `${name}_${Date.now()}.${ext}`;
            cb(null,filename) //(err, filename)
          }
    })
})

const app = express();
app.use(express.json());

const handlebarsEngine = createHandlebarsEngine({
    extname: "handlebars", //duoi tat ca file la .handlebars
    defaultLayout: "main",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: {
      eq: (left, right)=>{
        return left === right;
      }
    }
  });
  //cấu hình req body


  //khai bao engine handlebars
app.engine("handlebars", handlebarsEngine.engine);
//su dung handlebar
app.set("view engine", "handlebars");
//cau hinh folder handlebar
app.set("views", "views/pages");

app.use(express.static("public"));
app.use(express.urlencoded());
connectMongoDb();

// app.get("/", (req, res)=>{
//     res.send("Welcome to Kiet homework");
// });
app.get("/", (req, res)=>{
    const pageCode = "accounts";
    res.render("accounts",{
        pageCode,
    });
});
app.get("/accounts", (req, res)=>{
    const pageCode = "accounts";
    res.render("accounts",{
        pageCode,
    });
});
app.get("/add-account",(req, res)=>{
    res.render("add-account");
});


app.get("/products",async (req,res)=>{
    const pageCode = "products";
    const categories = await CategoryRepo.getItem();
    const products = await ProductRepo.getItem();
    const rcategories = await RcategoryRepo.getItem();
    res.render("products",{
        pageCode,
        categories,
        products,
        rcategories
    });
});

app.get("/products/add-category",(req,res)=>{
    const pageCode = "products";
    res.render("add-category",{
        pageCode: "products"
    });
});
app.post("/products/add-category", async (req,res)=>{
    const data = req.body;
    //cach 1
    // const category = new CategoryModel({
    //     Cname: data.name
    // });
    // await category.save();

    //cach 2
    await RcategorysModel.create({
        RCname: data.name,
        RCdesc: data.desc
    });
    res.redirect("/products");
});

app.get("/products/add-category/:id", async (req,res)=>{
    const id = req.params.id;
    const category = await RcategorysModel.findById(id).lean();
    console.log("category: ", category);
    res.render("add-category",{
        pageCode: "products",
        category,
        isEditing: true,
    }); 
});

app.post("/products/add-category/:id", async (req,res)=>{
    const id = req.params.id;
    const data = req.body;
    console.log("data: ",data);
    await RcategorysModel.updateOne(
        {
            _id: id,
        },
        {
            $set: {
                RCname: data.name,
                RCdesc: data.desc,
            }
        }
    );
    res.redirect("/products");
});

app.get("/products/category/:id/delete", async (req,res)=>{
    const id = req.params.id;
    await RcategorysModel.deleteOne({
        _id: id
    });

    res.redirect("/products");
});


app.delete("/products/category/:id", async (req,res)=>{
    const id = req.params.id;
    await RcategorysModel.deleteOne({
        _id: id
    });

    res.json({
        status:true
    });
});

//add products

app.get("/products/add-product", async (req,res)=>{
    const categories = await RcategorysModel.find().lean();

    res.render("add-product",{
        pageCode: "products",
        categories
    });
});

app.post("/products/add-product",multerUploader.single("image"), async (req,res)=>{
    const data = req.body;
    const file = req.file;
    console.log(data);   
    console.log(file);   
    const product = new ProductsModel({
        Pname: data.name,
        Pdesc: data.desc,
        Pinstock: data.unitInStock,
        Pprice: data.price,
        Cid: data.categoryId,
        imgUrl:`/assets/img/${file.filename}`
    });
    await product.save();
    
        res.redirect("/products");
});
app.listen(3000, ()=> {
    console.log("app is running on port 3000");
});