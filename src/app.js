import express from "express";
import { create as createHandlebarsEngine } from "express-handlebars";
import {connectMongoDb} from "./config.js"
import {CategoryRepo} from "./db/category.js"
import {ProductRepo} from "./db/products.js"
import {RcategoryRepo} from "./db/realCategory.js"

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

  //khai bao engine handlebars
app.engine("handlebars", handlebarsEngine.engine);
//su dung handlebar
app.set("view engine", "handlebars");
//cau hinh folder handlebar
app.set("views", "views/pages");

app.use(express.static("public"));

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
app.get("/add-category",(req,res)=>{
    res.render("add-category");
});
app.get("/products",async (req,res)=>{
    const pageCode = "products";
    const categories = await CategoryRepo.getItem();
    const products = await ProductRepo.getItem();
    const rcategories = await RcategoryRepo.getItem();
    console.log(categories);
    res.render("products",{
        pageCode,
        categories,
        products,
        rcategories
    });
});
app.get("/add-product",(req,res)=>{
    res.render("add-product");
});
app.listen(3000, ()=> {
    console.log("app is running on port 3000");
});