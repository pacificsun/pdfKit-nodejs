const express = require("express");
const index = require("./index");

const app = express();

const PORT = 8080;

app.get("/pdf", (req, res) => {
  index();
});

app.listen(PORT, () => console.log("Running in PORT 8080"));
