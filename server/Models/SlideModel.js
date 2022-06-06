import mongoose from "mongoose";


const slideSchema = mongoose.Schema(
    {
      image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
},
    {
      timestamps: true,
    }
  );
  

  const Slide = mongoose.model("slide", slideSchema);

export default Slide;
