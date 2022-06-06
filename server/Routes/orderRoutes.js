import express from "express";
import asyncHandler from "express-async-handler";
import admin from "../Middleware/admin.js";
import protect, { Active } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";
import nodemailer from "nodemailer"
import moment from "moment"
import sendEmail from "../utils/sendEmail.js";


const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
  "/",
  protect,
  Active,

  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      
      res.status(201).json(createOrder);
      

      await sendEmail({
        email: req.user.email,
        subject: "Order Confirmation ",
        message : `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fabcart</title>
            <style>
                body{
                    background-color: #F6F6F6; 
                    margin: 0;
                    padding: 0;
                }
                h1,h2,h3,h4,h5,h6{
                    margin: 0;
                    padding: 0;
                }
                p{
                    margin: 0;
                    padding: 0;
                }
                .container{
                    width: 80%;
                    margin-right: auto;
                    margin-left: auto;
                }
                .brand-section{
                   background-color: #0d1033;
                   padding: 10px 40px;
                }
                .logo{
                    width: 50%;
                }
        
                .row{
                    display: flex;
                    flex-wrap: wrap;
                }
                .col-6{
                    width: 50%;
                    flex: 0 0 auto;
                }
                .text-white{
                    color: #fff;
                }
                .company-details{
                    float: right;
                    text-align: right;
                }
                .body-section{
                    padding: 16px;
                    border: 1px solid gray;
                }
                .heading{
                    font-size: 20px;
                    margin-bottom: 08px;
                }
                .sub-heading{
                    color: #262626;
                    margin-bottom: 05px;
                }
                table{
                    background-color: #fff;
                    width: 100%;
                    border-collapse: collapse;
                }
                table thead tr{
                    border: 1px solid #111;
                    background-color: #f2f2f2;
                }
                table td {
                    vertical-align: middle !important;
                    text-align: center;
                }
                table th, table td {
                    padding-top: 08px;
                    padding-bottom: 08px;
                }
                .table-bordered{
                    box-shadow: 0px 0px 5px 0.5px gray;
                }
                .table-bordered td, .table-bordered th {
                    border: 1px solid #dee2e6;
                }
                .text-right{
                    text-align: end;
                }
                .w-20{
                    width: 20%;
                }
                .float-right{
                    float: right;
                }
            </style>
        </head>
        <body>
        
            <div class="container">
                <div class="brand-section">
                    <div class="row">
                        <div class="col-6">
                            <h1 class="text-white">PrintHub</h1>
                        </div>
                        <div class="col-6">
                           
                        </div>
                    </div>
                </div>
        
                <div class="body-section">
                    <div class="row">
                        <div class="col-6">
                            <h2 class="heading">Invoice No: ${createOrder._id}</h2>
                            <p class="sub-heading">Order Date: ${moment(createOrder.createdAt).format("DD/MM/YYYY")}</p>
                            <p class="sub-heading">Email Address: ${req.user.email} </p>
                        </div>
                        <div class="col-6">
                            <p class="sub-heading">Full Name: ${createOrder.shippingAddress.fullname}  </p>
                            <p class="sub-heading">Address: ${createOrder.shippingAddress.address}  </p>
                            <p class="sub-heading">Phone Number: ${req.user.phonenum}   </p>
                            <p class="sub-heading">Country: ${createOrder.shippingAddress.country} ,City: ${createOrder.shippingAddress.city} ,Code Postal: ${createOrder.shippingAddress.postalCode}  </p>
                        </div>
                    </div>
                </div>
        
                <div class="body-section">
                    <h3 class="heading">Ordered Items</h3>
                    <br>
                    <table class="table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th class="w-20">Price</th>
                                <th class="w-20">Quantity</th>
                                <th class="w-20">Grandtotal</th>
                            </tr>
                        </thead>
                        <tbody>
    
                        ${createOrder.orderItems.map((i) => (
                          `
                          <tr>
                              <td>${i.name}</td>
                              <td>${i.price} TND</td>
                              <td>${i.qty}</td>
                              <td>${(i.qty * i.price).toFixed(2)} TND</td>
                          </tr>
                          `
                           ))}
                           
                            <tr>
                                <td colspan="3" class="text-right">TOTAL (HT)</td>
                                <td>${(Number(itemsPrice) + Number(shippingPrice)).toFixed(2)} TND</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right">Total TAXES:</td>
                                <td>${createOrder.taxPrice} TND</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right">TOTAL TTC</td>
                                <td>${createOrder.totalPrice} TND</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <h3 class="heading">Payment Status:Not Paid</h3>
                    <h3 class="heading">Payment Mode: ${createOrder.paymentMethod}</h3>
                </div>
        
                <div class="body-section">
                    <p>&copy; Copyright 2022 - Printhub. All rights reserved. 
                        <a href="https://www.printhub.tn/" class="float-right">www.printhub.tn</a>
                    </p>
                </div>      
            </div>      
        
        </body>
        </html>`
        
    });
   


    }
  })
);

// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);


  })
);


// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  Active,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id fname lname email");
    res.json(orders);
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate(
      "user",
      "email phonenum"
    );

    if (order && order.user.id === req.user.id || req.user.role==="Admin") {

      res.json(order);
    } else {
      res.status(404);
      throw new Error("You are not authorised");
    }
  })
);

// ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

orderRouter.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);






export default orderRouter;
