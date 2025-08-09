const mongoose = require("mongoose");
// const Listing = require("../models/listings");

const connectDB = async () => {
  await mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("connected...");
    })

    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
