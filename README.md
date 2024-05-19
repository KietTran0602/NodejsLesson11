# NodejsLesson11

1. npm init
2. npm install --save-dev nodemon
3. npm install express


4. import express from "express";

const app = express();

app.get("/", (req, res)=>{
    req.params => lấy tập hợp biến truyền lên web
    

    res.send("Welcome to Kiet homework");
    res.Render("trang trong views",{các biến truyền đi});
    res.redirect("/đường dẫn về trang khác);
    res.end("xuất ra các thông tin")
});

app.listen(3000, ()=> {
    console.log("app is running on port 3000");
});

5. nodemon.json: {
    "watch": ["src"]
}

6. npm install express-handlebars
7. npm install mongodb
8. npm install mongoose --save
9. npm install --save multer