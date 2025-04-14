const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const database = require("./config/database");
const cron = require("node-cron");
const { checkLiveStatus } = require("./cron/cron");

const routes = require("./routes/routes");
const YoutubeVideos = require("./models/YoutubeVideos");
const YoutubeController = require("./controllers/getYoutubeVideos");

// Validate essential environment variables
if (!process.env.YOUTUBE_API_KEY) {
  console.log("YOUTUBE_API_KEY is not set in environment variables");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.log("MONGO_URI is not set in environment variables");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

database.connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const streamers = [
  // besties
  "4head",
  "ming",
  "nidas",
  "SimplessR6",
  "dripp",
  "fanfan",
  "travpiper",
  "caramel",
  "julian",
  "TheDoubles",
  "zuck",
  "jack",
  "razzy",
  "SlightlyPoetic",
  "kyle",
  "harmless",
  "mdrakoo",
  "manax",
  "ChopoNZ",
  "RissahBear",
  "ipink_",
  "sukhi_1",
  "goufbam",
  "EnduringAnguish",
  "daisyks",
  "SwizzMB",
  "chelb",
  "ThatGuyGP",
  "Stuply",
  "stormskii",

  // Albuterol_Boys
  "omie",
  "ripoozi",
  "zaytyree",
  "tylertr",
  "mfwarlock",
  "hazan_n",
  "xdavidoh",
  "baddy",
  "tjnv_",
  "napoleonslive",
  "ojhankson",
];

// Cron job to check live status of streamers
cron.schedule("*/2 * * * *", async () => {
  console.log("------------------------------------");
  console.log("Checking live status of streamers");
  // Function to check live status of streamers
  await checkLiveStatus(streamers);
  console.log("Live status updated");
  console.log("------------------------------------");
});

// Cron job to fetch youtube videos of channels
cron.schedule("*/2 * * * *", async () => {
  console.log("------------------------------------");
  console.log("Running the scheduled job to update YouTube data");
  try {
    const channels = await YoutubeVideos.find(
      {},
      {
        channelId: 1,
      }
    );

    for (const channel of channels) {
      // await YoutubeController.fetchVideos({
      //     params: { channelId: channel.channelId },
      // });

      const result = await YoutubeController.fetchVideosLogic(
        channel.channelId
      );

      if (result.success) {
        console.log(`Updated channel: ${channel.channelId}`);
      } else {
        console.log(`Failed to update channel: ${channel.channelId}`);
      }
    }

    console.log("YouTube data updated successfully");
    console.log("------------------------------------");
  } catch (error) {
    console.log("Error during scheduled job:", error);
    console.log("------------------------------------");
  }
});
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
