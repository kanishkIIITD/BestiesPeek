const express = require("express");
const router = express.Router();

const YouTubeController = require("../controllers/getYoutubeVideos");

const { getStreamerData } = require("../controllers/getStreams");
const { getUsers } = require("../controllers/getUsers");

router.post("/getStreamerData", getStreamerData);
router.get("/youtube/channel/:channelId/videos", YouTubeController.fetchVideos);
router.post("/users", getUsers);

module.exports = router;
