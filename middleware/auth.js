const secretkey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token is required." });
    }

    jwt.verify(token, secretkey, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid token." });
      }
      next();
    });
    console.log(secretkey);
  } catch (error) {
    console.log(error);
  }
}
module.exports = authenticateToken;
