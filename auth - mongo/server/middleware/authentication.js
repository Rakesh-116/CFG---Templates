import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticate = (req, res, next) => {
  // Get token from Authorization header (Bearer token)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authentication failed: No token provided" });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed: Invalid token" });
  }
};

export default authenticate;
