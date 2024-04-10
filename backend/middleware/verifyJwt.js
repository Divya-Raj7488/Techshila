const jwt = require("jsonwebtoken");

const verifyjwt = async (req, res, next) => {
    const header = req.headers.cookie;
  
    if (typeof header !== "undefined") {
      const token = header.split("=")[1].replace("Bearer%20", "");
      try {
        const user = jwt.verify(token, process.env.LOGIN_SECRET_TOKEN);
        req.user = user;
        next();
      } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ message: "unauthorized!!" });
      }
    } else {
      console.error("No Token in Cookie");
      res.status(403).json({ message: "Unauthorized! access denied!" });
    }
  };
  
module.exports = verifyjwt;
