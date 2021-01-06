const express = require("express");

const app = express();

app.use((req, res) => {
  res.redirect(301, "https://ekzlib.netlify.app" + req.path);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
