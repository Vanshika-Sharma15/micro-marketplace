const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { JWT_SECRET } = require("../config");


module.exports = async (req, res, next) => {
  try {
    console.log("HEADERS:", req.headers);   // ADD THIS
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);  // ADD THIS

    const decoded = jwt.verify(token, JWT_SECRET); // same secret used in login
    console.log("DECODED TOKEN:", decoded);


    // 🔥 FIX HERE → use decoded.id
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

