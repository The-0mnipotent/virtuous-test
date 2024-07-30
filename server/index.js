const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://arpitsingh92741:arpitsingh92741@cluster0.bbewldg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;

  try {
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    // Determine if the error is a validation error
    if (err.name === "ValidationError") {
      res.status(400).json({ message: "Validation error", error: err.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create user", error: err.message });
    }
  }
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
