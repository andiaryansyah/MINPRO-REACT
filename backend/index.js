import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import db from "./config/database.js";
import productRouter from "./routes/ProductRoute.js";
import router from "./routes/MerchantRoute.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected");
} catch (error){
    console.error(error);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json());
app.use(fileUpload());
app.use(router);
app.use(express.static("public"))
app.use(productRouter);

app.listen(5000, () => console.log('server running at port 5000'))