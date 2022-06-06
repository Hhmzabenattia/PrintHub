import mongoose from "mongoose";


const newsLatterSchema = mongoose.Schema(
    
    {
     
    email: {
        type: String,
        require: true
      },
},
  );
  

  const NewsLatter = mongoose.model("NewsLatter", newsLatterSchema);

export default NewsLatter;
