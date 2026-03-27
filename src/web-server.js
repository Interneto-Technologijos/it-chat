const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");

const app = express();
const PORT = 3000;

const cert = fs.readFileSync(path.join(__dirname, "..", "config", "cert.pem"));
const key = fs.readFileSync(path.join(__dirname, "..", "config", "key.pem"));

const server = https.createServer({ key, cert }, app);

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "static")));

const apiRouter = express.Router();

app.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}`);
});

module.exports = { apiRouter };
