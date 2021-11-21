import {ProductService} from "../serivices/Product";
import fs from "fs";
import {mimeTypes} from "../services/util";
import {imageUpload} from "../services/imgUpload";

export class Product {
    static async create(req, res, next) {
        try {
            const {title, price} = req.body
            const {userId, file} = req
            const imgName = `${file.fieldname}-${Date.now()}${mimeTypes[file.mimetype]}`
            const folder = `public/images`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true})
            }
            const fileName = folder + '/' + imgName
            fs.writeFileSync(fileName, file.buffer)

            const product = await ProductService.create(title, price, userId, fileName)
            res.status(201)
            res.json({
                product
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAllProducts(req, res, next) {
        try {
            const products = await ProductService.getAllProduct()
            res.json(products)
        } catch (e) {
            next(e)
        }
    }

    static async deleteProductById(req, res, next) {
        try {
            const {id} = req.params
            await ProductService.deleteProductById(id)
            res.json({
                status: 'ok',
                message: 'product successfully deleted'
            })
        } catch (e) {
            next(e)
        }
    }

    static async updateProductById(req, res, next) {
        const {id} = req.params
        const {title, price} = req.body
        const {files} = req
        const groupimage = files.map(file => {
            return imageUpload(file)
        })
        await ProductService.updateProductById(id, title, price, groupimage)

        res.json({
            status: 'ok',
            message: "product successfully updated"
        })
    }
}