const express = require("express");
const { addAdmin, login, logOut } = require("../controllers/authController");

const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/login", login);
router.post("/logout", logOut);

module.exports = router;
