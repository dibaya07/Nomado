const express = require("express");
const {
  getAllListings,
  getListing,
  addListing,
  editListing,
  deleteListing,
} = require("../controller/listings");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { listingSchema } = require("../schema.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body, { convert: true });
  if (error) {
    return res.status(500).json(error);
  } else {
    next();
  }
};

router.get("/", getAllListings);
router.get("/:id", getListing);
router.post(
  "/",
  upload.single("file"),
  verifyToken,
  validateListing,
  addListing
);
router.put("/:id", upload.single("file"), validateListing, editListing);
router.delete("/:id", verifyToken, deleteListing);

module.exports = router;
