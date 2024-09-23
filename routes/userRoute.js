import express from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth-middleware.js";
import { upload } from "../middlewares/multer.js";



const router = express.Router();

router.post("/register",upload.single('profilePhoto'),register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/profile/update",isAuthenticated,upload.single('resume'),updateProfile);
// array('name',5)

export default router;