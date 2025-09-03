const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getAllReviews,
  addReview,
  deleteReview,
} = require("../controller/reviews");
const router = express.Router();

router.get("/:id", getAllReviews);
router.post("/",verifyToken, addReview);
router.delete("/:id", deleteReview);

module.exports = router;
