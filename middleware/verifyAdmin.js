const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (token === undefined) {
      res.status(401).send("Authorization failed");
    }

    jwt.verify(token, "secretKey");

    next();
  } catch (error) {
    res.status(401).send({ Error: error, Message: "Authorization Failed" });
  }
};

module.exports = verifyAdmin;
