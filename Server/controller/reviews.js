const listings = require("../models/listings");
const Reviews = require("../models/reviews");

const getAllReviews = async (req, res) => {
  const id = req.params.id;
  let val = await Reviews.find({ listing: id });
  res.json(val);
};

const addReview = async (req, res) => {
  let { listing, comment, rating } = req.body;
  if (!listing || !comment) {
    res.status(500).json({ message: "something is wrong" });
  }
  const newReview = await Reviews.create({ listing, comment, rating });

  return res.json(newReview);
};

const deleteReview = async (req, res) => {
  return res.json(newReview);
};

module.exports = { getAllReviews, addReview, deleteReview };
