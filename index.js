require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const user_collection = require("./src/user-config");
const inquiry_collection = require("./src/inquiry-config");

const bcrypt = require("bcrypt");
const { clear } = require("console");

const app = express();
app.use(expressLayouts);
app.set("layout", "./layouts/layout-1.ejs");
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/catalog-2", (req, res) => {
  res.render("catalog-2", { layout: "./layouts/layout-2.ejs" });
});
app.get("/catalog-3", (req, res) => {
  res.render("catalog-3", { layout: "./layouts/layout-2.ejs" });
});
app.get("/catalog-4", (req, res) => {
  res.render("catalog-4", { layout: "./layouts/layout-2.ejs" });
});
app.get("/sent-already", (req, res) => {
  res.render("sent-already", { layout: "./layouts/layout-3.ejs" });
});
app.get("/sent-successfully", (req, res) => {
  res.render("sent-successfully", { layout: "./layouts/layout-3.ejs" });
});

const now = new Date();
const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const endOfToday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1
);

// Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  // Check if the username already exists in the database
  const existingUser = await user_collection.findOne({ name: data.name });

  if (existingUser) {
    res.send("User already exists. Please choose a different username.");
  } else {
    // Hash the password using bcrypt
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // Replace the original password with the hashed one

    const userdata = await user_collection.insertMany(data);
    console.log(userdata);
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const check = await user_collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("User name cannot found");
    }
    // Compare the hashed password from the database with the plaintext password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (!isPasswordMatch) {
      res.send("wrong Password");
    } else {
      res.render("home");
    }
  } catch {
    res.send("wrong Details");
  }
});

// Submit Inquiry Form
app.post("/submitInquiry", async (req, res) => {
  const data = {
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    inquiry: req.body.inquiry,
    createDate: new Date(),
  };

  // Check if the username already exists in the database
  const existing = await inquiry_collection.findOne({
    mobile: data.mobile,
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  });

  if (existing) {
    console.log("sent already!");
    /*res.send("Already sent!");*/
    res.render("sent-already", { layout: "./layouts/layout-3.ejs" });
  } else {
    const inquiryData = await inquiry_collection.insertMany(data);
    console.log(inquiryData);
    res.render("sent-successfully", { layout: "./layouts/layout-3.ejs" });
  }
});

// Define Port for Application
const port = process.env.PORT | 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
