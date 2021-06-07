import Express from "express";

const express = new Express();

const PORT = process.env.PORT || 9999;

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello welcome babel\n");
});

app.listen(PORT, "0.0.0.0");

console.log(`NodeJS running on port ${PORT}`);

export default app
