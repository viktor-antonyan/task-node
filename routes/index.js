import express from "express";
import usersRouter from './users'
import productRouter from './products'

let router = express.Router();

/* GET home page. */
router.use('/user', usersRouter)
router.use('/product', productRouter)

export default router;
