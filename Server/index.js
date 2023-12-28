const express = require("express");
const cors = require("cors");
const dbConect = require("./dbConect");
const app = express();
const cloudinary = require("cloudinary").v2;
const userRoutes = require("./Routes/userRoutes");
require("dotenv").config();

app.use(express.json({ limit: "30mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("api called");
});

app.use("/auth", userRoutes);

dbConect();

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
