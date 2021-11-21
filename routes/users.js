import express from "express";
import {User} from "../controllers/User";
import multer from "multer";

let router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

/* GET users listing. */
router.post('/register', upload.single('avatar'), User.register)
router.post('/login',  User.login)

export default router;
