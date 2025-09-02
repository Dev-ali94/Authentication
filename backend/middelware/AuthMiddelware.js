
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "User is unauthorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // Always set custom property
      req.userId = tokenDecode.id;

      // Also ensure body exists and add userId for POST/PUT requests
      if (!req.body) req.body = {};  
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: "User is unauthorized" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = userAuth;

