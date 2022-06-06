

const admin = (req, res, next) => {
    if (req.user && req.user.role==="Admin") {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an Admin");
    }
  };

  

  export default admin;