const dotenv = require("dotenv").config({ path: "../.env" });
const connectDB = require("../config/connectDB");
const Listing = require("../models/listings");
const data = require("./data");

const initDB = async () => {
  try {
    await connectDB();
    await Listing.deleteMany({});
    data.data = data.data.map((obj) => ({
      ...obj,
      owner: (process.env.EXISTING_LISTING_OWNER),
    }));
    return await Listing.insertMany(data.data);
  } catch (err) {
    console.log("init error :" + err);
  }
};

initDB();
