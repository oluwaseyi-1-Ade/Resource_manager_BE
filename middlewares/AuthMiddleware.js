import jwt from "jsonwebtoken";

const { verify } = jwt;

export const validateToken = async (req, res, next) => { 
  try {
    const authHeader = req.header("authorization"); 

    if (!authHeader) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const validTokenData = verify(token, process.env.accessTokenSecret);
    
    req.user = validTokenData;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" }); 
  }
};
