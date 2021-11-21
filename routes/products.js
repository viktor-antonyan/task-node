import express from "express";
import multer from "multer";
import {Product} from "../controllers/Product";
import roleAccess from "../middlewares/role";

let router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

/* GET users listing. */
router.post('/', upload.single('img'), roleAccess(1), Product.create)
router.get('/', Product.getAllProducts)
router.delete('/:id', roleAccess(1), Product.deleteProductById)
router.put('/:id', upload.array('images'), roleAccess(1), Product.updateProductById)

export default router;
