import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  // const {token} = req.cookies;
  // console.log(authHeader);
  console.log("token",token);
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  console.log("reached here");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("first")
    console.log("verified",verified);
    req.user = await User.findById(verified.id);
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

export default authMiddleware;
