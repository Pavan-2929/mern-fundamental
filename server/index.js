import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.log(console.log(error));
  });

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/getuser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.json(allUser);
  } catch (error) {
    res.json(error);
  }
});

app.post("/adduser", (req, res) => {
  try {
    const users = req.body;
    const newUser = new User(users);
    newUser.save();
    res.json("user created successfully");
  } catch (error) {
    res.json(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server connected");
});
