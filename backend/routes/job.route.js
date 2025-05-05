import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  savedjobs,
  saveJob,
  unsaveJob,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/update/:id").put(isAuthenticated, updateJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:jobId").get(isAuthenticated, getJobById);
router.route("/savedjob/:id").post(isAuthenticated, saveJob);
router.route("/savedjob").get(isAuthenticated, savedjobs);
router.route("/deletejob/:jobId").delete(isAuthenticated, unsaveJob);

export default router;
