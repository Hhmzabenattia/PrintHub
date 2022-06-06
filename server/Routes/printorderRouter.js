import express from "express";
import asyncHandler from "express-async-handler";
import admin from "../Middleware/admin.js";
import protect, { Active, Printing } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";
import PrintOrder from "../Models/PrintingOrderModel.js";
import { v2 as cloudinary } from 'cloudinary'


const printorderRouter = express.Router();



printorderRouter.get(
  "/",
  protect,
  Printing,
  Active,
  asyncHandler(async (req, res) => {
    const order = await PrintOrder.find({ acceptedby: req.user._id }).sort({ _id: -1 }).populate("order" , "orderItems shippingAddress ");
    res.json(order);


  })
);



printorderRouter.post(
  "/:id",
  protect,
  Active,
  Printing,
  asyncHandler(async (req, res) =>  {
  try{
    const ordervalide = await Order.findById(req.params.id);
    if (!ordervalide) {
      res.status(400);
      throw new Error("No Order Exist");

    } else if (ordervalide.isAccepted) {
        res.status(201).json("Order Allready accepted by other print");  
    }
    else{
      try{
      ordervalide.isAccepted=true;
      await ordervalide.save();

      const order = new PrintOrder({    
                order:ordervalide._id ,
                acceptedby: req.user._id,
            accepteddAt:Date.now(),
          });
        
          if (order)
          {
            const createOrder = await order.save();
            res.status(201).json(createOrder);
          }
          else
          {
            res.status(201).json("Error");  

          }} catch{
            ordervalide.isAccepted=false;
            await ordervalide.save();
            res.status(201).json("Error");  

          }
    }
  } catch(err)
  {
    res.status(201).json("Error");  
  } }))



  printorderRouter.get(
    "/list",
    protect,
    Active,
    Printing,
    asyncHandler(async (req, res) => {
      const order = await Order.find({ isAccepted: false , isPaid:true }).sort({ _id: -1 });
      res.json(order);
  
  
    })
  );  






  printorderRouter.get(
    "/a",
    protect,
    asyncHandler(async (req, res) => {
      const order = await PrintOrder.find(req.query).sort({ _id: -1 }).populate("order acceptedby" , "orderItems shippingAddress socite");
      res.json(order);
  
  
    })
  );

  
  
  printorderRouter.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const order = await PrintOrder.find().sort({ _id: -1 }).populate("order acceptedby", "orderItems shippingAddress socite email");
      res.json(order);
    })
  );



  printorderRouter.get(
    "/:id",
    protect,
    Printing,
    asyncHandler(async (req, res) => {
  
      const order = await Order.findById(req.params.id).populate(
        "user",
        "email phonenum"
      );
  
      if (order && req.user.role==="Imprimerie") {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("You are not authorised");
      }
    })
  );




  printorderRouter.get(
    "/print/:id",
    protect,
    Printing,
    asyncHandler(async (req, res) => {
  
      const order = await PrintOrder.findById(req.params.id).populate(
        "order",
        "orderItems shippingAddress isDelivered deliveredAt"
      );
  
      if (order && req.user.role==="Imprimerie") {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("You are not authorised");
      }
    })
  );



  printorderRouter.put(
    "/:id",
    protect,
    Active,
    Printing,
    asyncHandler(async (req, res) => {
   
      const existorder = await PrintOrder.findById(req.params.id);
      if (existorder) {
        if (req.body.facture !=="")
        {
          const result = await cloudinary.uploader.upload(req.body.facture, {
            folder: `facture/${existorder._id}`,
            crop: "scale",
        });
        existorder.facture = result.secure_url || existorder.facture;
        }
        existorder.status = req.body.status || existorder.status;
  
      
        const order = await existorder.save();
        res.json({
          order
        });
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
    
    })
  );
  
  






export default printorderRouter;
