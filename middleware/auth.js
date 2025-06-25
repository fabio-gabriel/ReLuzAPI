const { adminAuth } = require("../config/firebase");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const authorizeRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userDoc = await adminDB.ref(`users/${req.user.uid}`).once("value");
      const userData = userDoc.val();

      if (!userData || !roles.includes(userData.role)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      req.userRole = userData.role;
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ error: "Authorization failed" });
    }
  };
};

module.exports = { authenticateToken, authorizeRole };
