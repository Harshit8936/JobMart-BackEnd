import express from "express";
import isAuthenticated from "../middlewares/auth-middleware.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/post",isAuthenticated,postJob);
router.get("/get-all-jobs",getAllJobs);
router.get("/get-job/:id",isAuthenticated,getJobById);
router.get("/get-admin-jobs",isAuthenticated,getAdminJobs);

export default router;