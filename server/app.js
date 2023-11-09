const express = require("express");
const app = express();
require("dotenv/config")

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());


app.get("/", (req, res) => {
    return res.json("Hii...")
})

//user Authentication router//
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

// Artist Routes
const artistRoutes = require("./routes/artist");
app.use("/api/artists/", artistRoutes);

//Albums routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

//Song routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", (error) => {
        console.log(`ERROR : ${error}`);
    })

app.listen(4000, () => console.log("Listenning to port 4000"));