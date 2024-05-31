const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

const port = process.env.PORT || 5050;


const showRoutes = require(path.join(__dirname, "/routes/showsroutes"));

app.use(express.json());
app.use(cors());

app.use("/shows", showRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log("App Started on", port);
});
