const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

const port = process.env.PORT || 5050;


const showsRoutes = require(path.join(__dirname, "/routes/showsroutes"));
const showSession = require(path.join(__dirname, "/routes/sessionroutes"));

app.use(express.json());
app.use(cors());

app.use("/shows", showsRoutes);
app.use("/session", showSession);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log("App Started on", port);
});