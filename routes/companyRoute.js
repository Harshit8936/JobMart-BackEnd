import express from "express";
import isAuthenticated from "../middlewares/auth-middleware.js";
import { companyUpdate, getCompanies, getCompanyById, registerCompany } from "../controllers/companyController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create",isAuthenticated,registerCompany);
router.get("/get-companies",isAuthenticated,getCompanies);
router.get("/get-company/:id",isAuthenticated,getCompanyById);
router.put("/update/:id",isAuthenticated,upload.single('logo'),companyUpdate);

export default router;