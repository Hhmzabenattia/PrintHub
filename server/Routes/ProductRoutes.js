import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import protect, { Active } from "./../Middleware/AuthMiddleware.js";
import admin from "./../Middleware/admin.js";
import Category from "./../Models/CategoryModel.js"
import { v2 as cloudinary } from 'cloudinary'


const productRoute = express.Router();

//Home Page 5 item Slide

productRoute.get(
  "/slide1",
  asyncHandler(async (req, res) => {
    
    const products = await Product.find().limit(5);
    
    res.json({products});
  })
);


productRoute.post(
  "/upload",
  asyncHandler(async (req, res) => {

    const result = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "Order"
    });
      if (!result)
      {
        res.status(404).json("No File");
      }

    const file = result.secure_url;
  ;
  
  res.status(200).json(file)


  })
);



// CREATE PRODUCT
productRoute.post(
  "/",
 protect,
 admin,
 Active,
  asyncHandler(async (req, res) => {
    const { name, description,price,productcategory,carac,quantity } = req.body;
    const catexist = await Category.findOne({ name: productcategory });
    const productExist = await Product.findOne({ name });

    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    }
    else if (!catexist)
     {
      res.status(400);
      throw new Error("Category not found");


     }else
     {
 
  
      let images = [];
      if (typeof req.body.images === "string") {
          images.push(req.body.images);
      } else {
          images = req.body.images;
      }
  
      const imagesLink = [];
  
      for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
              folder: `products/${name}`,
          });
  
          imagesLink.push(result.secure_url);
      }

      images = imagesLink
  
      const product = await Product.create({
        name,
        images,
        description,
        price,
        productcategory,
        carac,
        quantity,
      });
  
      if (product) {
        res.status(201).json({
          product
        });
      } else {
        res.status(400);
        throw new Error("Invalid product Data");
      }
     }


  })
);




// DELETE PRODUCT
productRoute.delete(
  "/:id",
protect,
admin,
Active,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);



// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  Active,

  asyncHandler(async (req, res) => {
    const { name, price, description, images, productcategory , carac,quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {

      let images = [];
      if (typeof req.body.images === "string") {
          images.push(req.body.images);
      } else {
          images = req.body.images;
      }
  
      const imagesLink = [];
  
      for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
              folder: `products/${name}`,
          });
  
          imagesLink.push(result.secure_url);
      }

      images = imagesLink


      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = images || product.images;
      product.productcategory = productcategory || product.productcategory;
      product.carac = carac || product.carac;
      product.quantity = quantity || product.quantity;


      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);





//Get All Products Admin

productRoute.get(
  "/all",
  protect,
  admin,
  Active,

  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);



productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find(req.query).sort({_id:-1});
   
      res.json({products});
   
    
  })
);



// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  Active,

  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.fname,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);
export default productRoute;
