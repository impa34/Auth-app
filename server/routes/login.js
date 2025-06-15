import express from 'express'
const router = express.Router();
import requireAuth from '../middleware/auth.js'


import { loginUser, registerUser } from "../controllers/auth.controller.js";

router.post("/login", loginUser);

router.post("/register", registerUser); 

router.get("/home", requireAuth, (req,res) => {
    res.json({message:`Welcome ${req.user.user}`})
} )

export default router; 