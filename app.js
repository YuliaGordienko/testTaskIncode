const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const contactsRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
dotenv.config();
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/users", contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Sorry, Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
