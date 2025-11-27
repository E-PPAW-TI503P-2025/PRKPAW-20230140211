const jwt = require("jsonwebtoken");
const JWT_SECRET = "INI_ADALAH_KUNCI_RAHASIA_ANDA_YANG_SANGAT_AMAN";

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // user info dari token
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak: hanya admin" });
  }
  next();
};
