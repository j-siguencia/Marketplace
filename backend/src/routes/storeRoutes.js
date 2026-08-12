const express = require("express");

const { getAllStores, createStore } = require("../controllers/storeController");

const router = express.Router();

router.get("/", getAllStores);
router.post("/", createStore);

module.exports = router;
