const mongoose = require("mongoose");
const { listen } = require("../app");
const app = require("../app");

const { PORT = 5000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.messege);
    process.exit(1);
  });
