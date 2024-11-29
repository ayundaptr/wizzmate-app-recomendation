const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token is required!" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7, authHeader.length)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token!" });
  }
};
