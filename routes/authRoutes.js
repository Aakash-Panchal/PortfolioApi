const express = require("express");
const { addAdmin, login } = require("../controllers/authController");

const router = express.Router();

router.post("/addAdmin", addAdmin);
router.post("/login", login);

module.exports = router;
