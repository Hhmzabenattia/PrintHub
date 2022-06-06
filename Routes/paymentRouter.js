import express from "express";
import Stripe from "stripe";


const paymentRouter = express.Router();

paymentRouter.get("/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
  });
  
  


  const stripe = new Stripe('sk_test_51KjobLDV9S7PwoyMhxywBPjxFI9wO4WOM7chIAFTERONVp4Fc8NUTIM2vkKPDaOgB2xSS98xDwj6CvsYA6tmz7AG00l5ZhRkJn');


  paymentRouter.post("/stripe",async (req, res) => {
    const total = req.body.amount;
  const payment = await stripe.paymentIntents.create(
    {
      amount: total,
      currency: "usd",

    })
    res.status(201).send({
      ClientSecretId : payment.client_secret,
    });
  
  
  
  });
  





  export default paymentRouter;

    
