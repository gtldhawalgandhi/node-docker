const Express = require("express");

const express = new Express();

const PORT = 9999;

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World using dockerfile\n");
});

app.listen(PORT, "0.0.0.0");

console.log(`NodeJS running on port ${PORT}`);

module.exports = app
