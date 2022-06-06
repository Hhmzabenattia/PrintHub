import mongoose from "mongoose";

const PrintSchema = mongoose.Schema(
{
      order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order",
      },
      accepteddAt: {
        type: Date,
      },
      acceptedby: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
      status: {
        type: String,
        default: "Pending"
      },
      facture: {
        type: String,
        require: true,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },

     
},
 {
    timestamps: true,
  }

);

const PrintOrder = mongoose.model("PrintOrder", PrintSchema);
export default PrintOrder;



