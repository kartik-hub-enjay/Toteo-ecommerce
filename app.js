const express = require("express");
const app = express();
const cookieParser= require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const ownerRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");
const db = require("./config/mongoose-conection");

require("dotenv").config();
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/owners",ownerRouter);
app.use("/users",usersRouter);
app.use("/owners/products",productsRouter);
app.use("/",indexRouter);
app.listen(3000);