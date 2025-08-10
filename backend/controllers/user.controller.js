import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(fullname, email, phoneNumber, password, role);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in register: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(email, password, role);
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      user.role !== role
    ) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,       
  sameSite: "None",    
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});


    res.json({ success: true, message: `Welcome back ${user.fullname}`, user });
  } catch (error) {
    console.error("Error in login: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("Could not find the email");
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000);

    user.otpCode = otpCode;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("something is missing", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res
    .cookie("token", "", { maxAge: 0 })
    .json({ success: true, message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
const fileUri = getDataUri(file);

const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
  resource_type: "raw"
});

if (cloudResponse) {
 
  const viewUrl = cloudResponse.secure_url;

  user.profile.resume = viewUrl;
  user.profile.resumeOriginalName = file.originalname;
}



    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

