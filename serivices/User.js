import db from "../services/db";
import bcrypt from "bcrypt";
import HttpError from "http-errors";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env

export class UserService {
    static async register(role_id, name, email, password, fileName) {
        const hashPass = await bcrypt.hash(password, 10);
        const [{insertId}] = await db.promise().execute('INSERT INTO users (`role_id`, `name`, `email`, `password`, `avater`,`status`) VALUES(?,?,?,?,?,?)', [
            role_id, name, email, hashPass, fileName, 'pending'
        ])
        return this.getUserById(insertId)
    }

    static async getUserById(id) {
        const [user] = await db.promise().execute('SELECT * FROM users WHERE id = ?', [
            id
        ])
        delete user[0].password
        return user[0]
    }

    static async getUserByEmail(email) {
        const [user] = await db.promise().execute('SELECT * FROM users WHERE email = ?', [
            email
        ])
        return user[0]
    }

    static async login(email, password) {
        const user = await this.getUserByEmail(email)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
            throw HttpError(403, 'invalid email or password')
        }
        const token = jwt.sign({userId: user.id, role: user.role_id}, JWT_SECRET)
        await db.promise().execute(`UPDATE users SET token = "${token}", status = "active" WHERE id = ?`, [
            user.id
        ])
        return token
    }
}