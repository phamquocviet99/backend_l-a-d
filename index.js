import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
// import upload from "./multer.js";
// import uploads from "./cloudinary.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
//Import Router
import informationRouter from "./routers/information.js";
import CategoryProjectRouter from "./routers/categories_projects.js";
import UserRouter from "./routers/users.js";
import ProjectRouter from "./routers/projects.js"
import RecruitRouter from "./routers/recruits.js"
import NewsRouter from "./routers/news.js"
import CategoryProductRouter from "./routers/categories_product.js"
import ProductRouter from "./routers/products.js"
import PartnerRouter from "./routers/partner.js"
import MessageCustomerRouter from "./routers/message_customer.js"
//Setup Port
const app = express();



const PORT = process.env.PORT || 5000;

const URI = process.env.MONGODB_URL;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // limit from front-end data 30MB
app.use(cors());

app.use("/information", informationRouter);
app.use("/categories_project", CategoryProjectRouter);
app.use("/project", ProjectRouter)
app.use("/recruit", RecruitRouter)
app.use("/user", UserRouter);
app.use("/news",NewsRouter)
app.use("/categories_product",CategoryProductRouter)
app.use("/product",ProductRouter)
app.use("/partner",PartnerRouter)
app.use("/message",MessageCustomerRouter)

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.log("err", err);
  });
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

