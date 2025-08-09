const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/user", require("./routes/user"));
app.use("/listings", require("./routes/listings"));
app.use("/reviews", require("./routes/reviews"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
