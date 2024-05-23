const express = require("express");
const port = process.env.PORT || 5550;
const app = express();
const route = require("./routes/route");

app.use("/api/v1", route);

app.get("/", (req, res) => {
  console.log(auth);
  res.send("h1");
  res.end();
});

app.listen(port, () => {
  console.log(port);
});
