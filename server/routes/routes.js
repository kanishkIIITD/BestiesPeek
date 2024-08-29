const express = require("express");
const router = express.Router();

const { getStreamerData } = require("../controllers/getStreams");

router.post("/getStreamerData", getStreamerData);

module.exports = router;
