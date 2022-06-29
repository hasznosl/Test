const express = require("express");
var cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

const data = require("./data");

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
