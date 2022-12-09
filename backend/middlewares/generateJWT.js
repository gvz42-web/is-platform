const jwt = require("jsonwebtoken");

const options = {
  expiresIn: "24h",
};

async function generateJWT(username) {
  try {
    const payload = { username };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}

module.exports = generateJWT;
