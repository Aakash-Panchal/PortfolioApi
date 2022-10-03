const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    console.log(token);

    if (token === undefined) {
      res.status(401).send("failed.");
    }

    jwt.verify(token, "secretKey");
    next();
  } catch (error) {
    res.status(401).send({ Error: error, Message: "Authorization Failed" });
  }
};

module.exports = verifyAdmin;
