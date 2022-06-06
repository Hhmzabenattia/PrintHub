import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js"; 
import slideRouter from "./Routes/slideRoutes.js";
import paymentRouter from "./Routes/paymentRouter.js";
import categoryRouter from "./Routes/categoryRouter.js";
import cloudinary  from "cloudinary";
import Stripe from "stripe";
import cors from "cors";
import fileUpload from "express-fileupload";
import printorderRouter from "./Routes/printorderRouter.js";
import newLatterRouter from "./Routes/newLatterRouter.js";



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

connectDatabase();
const app = express();
app.use(cors());

app.use(express.json({limit: '60mb'}));



// API
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/slide", slideRouter);
app.use("/api/printorder", printorderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/payment",paymentRouter)
app.use("/api/news",newLatterRouter)



// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
