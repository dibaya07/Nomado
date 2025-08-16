const Listings = require("../models/listings");

const getAllListings = async (req, res) => {
  console.log(req.token)
  let isToken = req.token
  let val = await Listings.find();
  res.json({val,isToken});
};
const getListing = async (req, res) => {
  let listing = await Listings.findById(req.params.id).populate("owner");
  res.json(listing);
};

const addListing = async (req, res) => {
  try {
    let { title, description, price, location, country } = req.body;

    const ownerID = req.user?.id;
    const image = {
      url: req.file?.path,
      filename: req.file?.filename,
    };
    const newListing = await Listings.create({
      title,
      description,
      image,
      price,
      location,
      country,
      owner: ownerID,
    });

    return res.status(201).json(newListing);
  } catch (err) {
    console.log("add listing " + err);
    return res.status(500).json({ message: "something is wrong " });
  }
};

const editListing = async (req, res) => {
  let id = req.params.id;
  let { title, description, price, location, country } = req.body;
  let listing = await Listings.findById(req.params.id);
  const updateData = { title, description, price, location, country };
  if (req.file) {
    updateData.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  try {
    if (!listing) {
      return res.status(400).json({ message: "something is wrong" });
    } else {
      await Listings.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      });
      return res.json(title, price);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something is wrong" });
  }
};
const deleteListing = async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listings.findById(id);
    if (!listing) {
      return res.status(400).json({ message: "user not found for delete" });
    }
    if (listing.owner?.toString() !== req.user?.id.toString()) {
      return res.status(400).json({ message: "wrong user for deletion" });
    }

    let deletedListing = await Listings.findByIdAndDelete(id);
    console.log(deletedListing);
    return res.json({ message: "deleted" });
  } catch (err) {
    return res.status(400).json({ message: "something is wrong" });
  }
};

module.exports = {
  getAllListings,
  getListing,
  addListing,
  editListing,
  deleteListing,
};
