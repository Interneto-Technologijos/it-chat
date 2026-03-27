const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "static")));

const apiRouter = express.Router();

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { apiRouter };
