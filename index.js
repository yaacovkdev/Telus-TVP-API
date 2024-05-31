const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5050;

app.use(cors);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log("App Started");
});
