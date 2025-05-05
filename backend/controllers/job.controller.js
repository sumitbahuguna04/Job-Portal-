import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate("company") // fetches full company object
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).populate([
      { path: "applications" },
      { path: "company" }
    ]);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// saveJob function
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();

      const updatedUser = await User.findById(userId).populate("savedJobs");

      return res.status(200).json({
        savedJobs: updatedUser.savedJobs,
        message: "Job saved successfully.",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Job is already saved.",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

// savedjobs function
export const savedjobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: {
        path: "company",
        select: "name",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      savedJobs: user.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

export const unsaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.id;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required ",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedJobs: jobId } },
      { new: true }
    ).populate({
      path: "savedJobs",
      populate: {
        path: "company",
        select: "name",
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job unsaved successfully",
    });
  } catch (error) {
    console.error("Error in unsaveJob:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(req.body);
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
    } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.salary = salary ? Number(salary) : job.salary;
    job.location = location || job.location;
    job.jobType = jobType || job.jobType;
    job.experienceLevel = experience || job.experienceLevel;
    job.position = position || job.position;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};
