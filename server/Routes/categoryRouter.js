import express from "express";
import asyncHandler from "express-async-handler";
import protect, { Active } from "../Middleware/AuthMiddleware.js";
import Category from "./../Models/CategoryModel.js"
import admin from "../Middleware/admin.js";
import { v2 as cloudinary } from 'cloudinary'


const categoryRouter = express.Router();

categoryRouter.get(
        "/",
        asyncHandler(async (req, res) => {
            const cat = await Category.find();
            res.json({ cat});


        })
);


categoryRouter.post(
    "/",
    protect,
    admin,
    Active,
    asyncHandler(async (req, res) => {

      const {name } = req.body;
      let image;
      if (req.body.image !=="")
      {
        const result = await cloudinary.uploader.upload(req.body.image, {
          folder: `Category/${name}`,
          crop: "scale",
        });
        image = result.secure_url;
      }


        const cat = await Category.create({
            image,
            name,
          });

          if (cat) {
            res.status(201).json(cat );
          } else {
            res.status(400);
            throw new Error("Invalid category Data");
          }
    })
);


categoryRouter.delete(
  "/:id",
protect,
admin,
Active,

  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({ message: "category deleted" });
    } else {
      res.status(404);
      throw new Error("category not Found");
    }
  })
);




export default categoryRouter;

