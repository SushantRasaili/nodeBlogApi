const express =  require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const postRouter = require("./routers/post");
const tagRouter = require('./routers/tags')
require('dotenv').config();


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

mongoose.connect("mongodb://localhost:27017/BlogPost")
.then(res => console.log("Succesfully connected to db"))
.catch(err => console.log(err));



app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/",postRouter);
app.use("/",tagRouter);

app.listen(3000, () => console.log("server has started"));