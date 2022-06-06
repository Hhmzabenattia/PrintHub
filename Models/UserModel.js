import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import findOneOrCreate from 'mongoose-findoneorcreate';
import crypto from "crypto"

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please Enter Your First Name"],
    },
    lname: {
      type: String,
      required: [true, "Please Enter Your Last Name"],
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phonenum: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: 'User',
    },
    socite: { type: String, required: false },
    tva: { type: String, required: false },
    adresse:{
      adr: { type: String, required: false },
      ville: { type: String, required: false },
      zipecode: { type: String, required: false },
    },
    isActive: {  type: Boolean,
    required: true,
    default: true,
    },
    avatar: {
      type: String,
      required: false,
    
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },

);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.plugin ( findOneOrCreate );


userSchema.methods.getResetPasswordToken = async function () {

  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

const User = mongoose.model("User", userSchema);


export default User;
