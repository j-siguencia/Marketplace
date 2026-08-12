const express = require("express");
const { getAllProduce } = require("../controllers/produceController");

const router = express.Router();

router.get("/", getAllProduce);

module.exports = router;
