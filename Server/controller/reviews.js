const listings = require("../models/listings");
const Reviews = require("../models/reviews");

const getAllReviews = async (req, res) => {
  try {
    const id = req.params.id;
    let val = await Reviews.find({ listing: id }).populate("owner");
    // console.log(val1)
    // let val = await Reviews.find({ listing: id });
    return res.json(val);
  } catch (error) {
    return res.json({ message: "getallreviews ln 12 error" });
  }
};

const addReview = async (req, res) => {
  let { listing, comment, rating } = req.body;
  // console.log(req.user?.id)
  const ownerID = req.user?.id
  
  if (!listing || !comment) {
    res.status(500).json({ message: "something is wrong" });
  }
  const newReview = await Reviews.create({ listing, comment, rating ,owner:ownerID});

  return res.json(newReview);
};

const deleteReview = async (req, res) => {
  // return res.json(newReview);
  let { id } = req.params;
  // console.log("ln 24 ", id)
  try {
    const review = await Reviews.findById(id);
    if (!review) {
      return res.status(400).json({ message: "review not found for delete" });
    }
    // if (listing.owner?.toString() !== req.user?.id.toString()) {
    //   return res.status(400).json({ message: "wrong user for deletion" });
    // }
    await Reviews.findByIdAndDelete(id);
    const allReviews =await Reviews.find({listing:review.listing})
    
    // console.log(review.listing);
    return res.json({ message: "deleted",reviews:allReviews });
  } catch (err) {
    return res.status(400).json({ message: "something is wrong" });
  }
};

module.exports = { getAllReviews, addReview, deleteReview };
