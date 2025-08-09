const mongoose = require("mongoose");
const reviews = require("./reviews");

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      url: String,
      filename: String,
    },
    price: {
      type: Number,
    },
    location: {
      type: String,
    },
    country: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
