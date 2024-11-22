const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' module
const {verifyJwt} =require("../util")
const auth = async (req, res, next) => {
  try {
   
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      const decode = await verifyJwt(token)
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

module.exports = { auth };
