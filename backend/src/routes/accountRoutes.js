const express = require("express");

const { registerAccount } = require("../controllers/accountController");

const router = express.Router();
router.post("/register", registerAccount);

module.exports = router;
