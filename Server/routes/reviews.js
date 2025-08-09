const express = require("express");
const {
  getAllReviews,
  addReview,
  deleteReview,
} = require("../controller/reviews");
const router = express.Router();

router.get("/:id", getAllReviews);
router.post("/", addReview);
router.delete("/:id", deleteReview);

module.exports = router;
