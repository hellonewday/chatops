const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const os = require("os");
require("dotenv").config();
require("./passport.js");

const accounts = require("./routes/accounts");
const activities = require("./routes/activities");
mongoose.connect(
  `mongodb://localhost:27017/chatops`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) console.log(error);
    console.log("Connect to database");
  }
);

app.use(cors());
app.use("/", express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/accounts", accounts);
app.use("/activities", activities);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
