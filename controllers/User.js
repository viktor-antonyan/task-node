import {UserService} from "../serivices/User";
import {imageUpload} from "../services/imgUpload";

export class User {
    static async register(req, res, next) {
        try {
            const {role_id, name, email, password} = req.body
            const {file} = req
            const fileName = imageUpload(file)
            const user = await UserService.register(role_id, name, email, password, fileName)
            res.status(201)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            const token = await UserService.login(email, password)
            res.json({
                status: 'ok',
                token
            })
        } catch (e) {
            next(e)
        }
    }
}