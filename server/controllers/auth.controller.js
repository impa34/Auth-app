import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

  export const registerUser = async (req, res) => {
    const { user, pass } = req.body;

    try {
      const exists = await User.findOne({ user });

      if (exists) return res.status(404).json({ message: "User already taken" });

      const hashedPass = await bcrypt.hash(pass, 10)
      const newUser = await User.create({user, pass: hashedPass})


      return res.status(200).json({ message: "User created succesfully", userId: newUser._id });

    } catch (e) {
      return res.status(500).json({message: e.message });
    }
  };

  export const loginUser = async (req, res) => {
    const { user, pass } = req.body;

    try {
      const foundUser = await User.findOne({ user });

      if (!foundUser) return res.status(404).json({ message: "User not found" });

      const isValid = await bcrypt.compare(pass, foundUser.pass)
      if (!isValid) return res.status(401).json({message: "Invalid credentials"})

      const token = jwt.sign({id:foundUser._id, user: foundUser.user}, process.env.JWT_SECRET, {
          expiresIn: "1h"
      })

      return res.status(200).json({ message: "Logged in succesfully", token });
    } catch (e) {
      return res.status(500).json({message:e.message });
    }
  };