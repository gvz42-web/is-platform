const jwt = require("jsonwebtoken");
const Admin = require("./../model/admin");

async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  let result;

  if (!authorizationHeader) {
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  const options = {
    expiresIn: "24h",
  };

  try {
    let admin = await Admin.findOne({
      token: token,
    });

    if (!admin) {
      result = {
        error: true,
        message: "Authorization error",
      };

      return res.status(403).json(result);
    }

    result = jwt.verify(token, process.env.JWT_SECRET, options);

    console.log(result);
    if (!admin.username === result.username) {
      result = {
        error: true,
        message: "Invalid token",
      };

      return res.status(401).json(result);
    }

    req.decoded = result;

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: true,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
}

module.exports = validateToken;
