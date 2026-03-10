import express from "express";
import { register, login, forgotPassword, resetPassword } from "../controller/authController.js";
import apiKeyAuth from "../middleware/apikeyAuth.js";

const router = express.Router();

/*
    POST  /api/auth/register
    Register new user
*/

router.post("/register",apiKeyAuth, register);


/*
    POST  /api/auth/login
    Login user
*/

router.post("/login",apiKeyAuth, login);


router.post("/forgot-password", apiKeyAuth, forgotPassword)

router.post("/reset-password", apiKeyAuth, resetPassword)


export default router;