import express from "express";
import asyncHandler from "express-async-handler";
import protect, { Active } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import admin from "../Middleware/admin.js";
import findOneOrCreate from 'mongoose-findoneorcreate';
import { v2 as cloudinary } from 'cloudinary'
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"


const userRouter = express.Router();

userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
 
    const existuser = await User.findById(req.user._id);
    if (existuser) {
      if (req.body.avatar !=="")
      {
        const result = await cloudinary.uploader.upload(req.body.avatar, {
          folder: `avatars/${existuser.fname} ${existuser.lname}`,
          crop: "scale",
      });
      existuser.avatar = result.secure_url || existuser.avatar;
      }
      existuser.fname = req.body.fname || existuser.fname;
      existuser.lname = req.body.lname || existuser.lname;
      existuser.email = req.body.email || existuser.email;
      existuser.phonenum = req.body.phonenum || existuser.phonenum;
      existuser.socite = req.body.socite || existuser.socite;
      existuser.tva = req.body.tva || existuser.tva;
      existuser.adresse.adr = req.body.adresse.adr || existuser.adresse.adr;
      existuser.adresse.ville = req.body.adresse.ville || existuser.adresse.ville;
      existuser.adresse.zipecode = req.body.adresse.zipecode || existuser.adresse.zipecode;


      existuser.role = req.body.role || existuser.role;



      if (req.body.password) 
      {
        existuser.password = req.body.password;
      }
      
      const user = await existuser.save();
      res.json({
        user,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  
  })
);





userRouter.post(
  "/socialmedia",
  asyncHandler(async (req, res) => {
    const { email, fname,lname,avatar } = req.body;
    const user = await User.findOneOrCreate ({ email },{
      fname,
      lname,
      email,
      password : email,
      avatar,
    });


    if (user) {
      res.json({
      user,
      token : generateToken(user._id),

      });
    } else {
      res.status(401);
      throw new Error("Email ou mot de passe invalide");
    }
  })
);

// LOGIN

userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
      user,
      token : generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Email ou mot de passe invalide");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { fname,lname, email, password,phonenum, role} = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("L'utilisateur existe déjà");
    }
        if (role==="User")
        {
    const user = await User.create({
      fname,
      lname,
      phonenum,
      email,
      password,
      role,
    });

    
    if (user) {
      res.status(201).json({
       user,
       token: generateToken(user._id),
      });
      
    } 
    else {
      res.status(400);
      throw new Error("Données invalides");
    }
  }
     if  (role==="Imprimerie")
      {
        const {tva,socite,adresse,} = req.body;
       
        const result = await cloudinary.uploader.upload(req.body.avatar, {
          folder: `Imprimerie/logo/${socite}`,
          crop: "scale",
      });
    
        const user = await User.create({
          fname,
          lname,
          phonenum,
          email,
          password,
          role,
          tva,
          socite,
          adresse,
          avatar:result.secure_url,
          isActive:false,
        });
      
        if (user)
       {
          res.status(201).json({
            user,
            token: generateToken(user._id),
          })
        }
          else {
            throw new Error("Erreur");
          }}  
  
    
  })
);

userRouter.post(
  "/password/forgot",
  asyncHandler(async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new Error("User Not Found", 404));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Link ",
        message : `     <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                  <a href="https://www.printhub.tn" title="logo" target="_blank">
                                    <img width="130" src="https://res.cloudinary.com/durmvqkw9/image/upload/v1653511299/log_rxuokl.png" title="logo" alt="logo">
                                  </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Vous avez demandé la réinitialisation de votre mot de passe</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
        Nous ne pouvons pas simplement vous envoyer votre ancien mot de passe. Un lien unique pour réinitialiser votre mot de passe a été généré pour vous. Pour réinitialiser votre mot de passe, cliquez sur le lien suivant et suivez les instructions.
                                                </p>
                                                <a href="${resetPasswordUrl}"
                                                    style="background:#ce13a2;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">réinitialiser le mot de passe</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                    <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.printhub.tn</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
`
        
    });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new Error(error.message, 500))
    }
}));


userRouter.put(
  "/password/reset/:token",
  asyncHandler(async (req, res, next) => {
  // create hash token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({ 
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user) {
      return next(new Error("Invalid reset password token", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(201).json({
    success: true,
    user,
    token: generateToken(user._id),
   });
}));



// Delete User

userRouter.delete(
  "/:id",
protect,
admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isActive=false ;
      await user.save();
      res.json({ message: "Utilisateur désactivé" });
    } else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  })
);


userRouter.put(
  "/:id",
protect,
admin,
  asyncHandler(async (req, res) => {
    const { role,isActive } = req.body;
  
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = role || user.role;
    user.isActive = isActive || user.isActive;


    const updateduser = await user.save();
    res.json(updateduser);
  }
   
    else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  })
);



// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json(
      user
      );
    } else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  })
);

// UPDATE PROFILE


userRouter.get(
  "/:id",
  protect,
  admin,
  Active,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  })
);


// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);



export default userRouter;
