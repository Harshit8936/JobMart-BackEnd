import express from "express";
import isAuthenticated from "../middlewares/auth-middleware.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/get-applied-jobs",isAuthenticated,getAppliedJobs);
router.get("/:id/applicants",isAuthenticated,getApplicants);
router.put("/update-status/:id",isAuthenticated,updateStatus);

export default router;