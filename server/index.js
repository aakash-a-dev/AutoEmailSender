const express = require("express");
const app = express();
const { main } = require("./controllers/emailController");

const port = 8000;

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/auth", (req, res) => {
  main();
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

