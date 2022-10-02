const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const ProjecRoutes = require("./routes/ProjectRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/admin", authRoutes);
app.use("/api/projects", ProjecRoutes);
app.use("/images", express.static("images"));

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

const database = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Connected to Database");
});
