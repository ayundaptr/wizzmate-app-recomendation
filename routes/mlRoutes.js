// Routing untuk API ML

const express = require("express");
const router = express.Router();
const { getPrediction } = require("../controller/mlController");

router.post("/predict", getPrediction);

module.exports = router;
