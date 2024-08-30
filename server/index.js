const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const database = require("./config/database");
const cron = require("node-cron");
const { checkLiveStatus } = require("./cron/cron");

const routes = require("./routes/routes");

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
    "fanfan",
    "ming",
    "nidas",
    "travpiper",
    "caramel",
    "julian",
    "thedoubles",
    "zuck",
    "jack",
    "razzy",
    "slightlypoetic",
    "kyle",
    "harmless_",
    "mdrakoo",
    "simplessr6",
    "manax321",
    "thatguygp",
    "dripp",
    "choponz",
    "stuply",
    "rissahbear",
    "kameu",

    // Albuterol_Boys
    "omie",
    "ripoozi",
    "ZayTyree",
    // "713Stew",
    "TylerTR",
    "mfWarlock",
    "hazan_n",
    "xDavidoh",
    "Either",
    "Baddy",
    "tjnv_",
    "NapoleonsLive",
];

cron.schedule("*/2 * * * *", async () => {
    console.log("------------------------------------");
    console.log("Checking live status of streamers");
    // Function to check live status of streamers
    await checkLiveStatus(streamers);
    console.log("Live status updated");
    console.log("------------------------------------");
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
