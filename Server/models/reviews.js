const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
       owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
