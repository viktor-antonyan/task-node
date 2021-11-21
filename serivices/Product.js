import db from "../services/db";

export class ProductService {
    static async create(title, price, userId, fileName) {
        const [{insertId}] = await db.promise().execute('INSERT INTO products (`user_id`, `title`, `price`, `img`) VALUES(?,?,?,?)', [
            userId, title, price, fileName
        ])
        return await this.getProductById(insertId)
    }

    static async getProductById(id) {
        const [product] = await db.promise().execute('SELECT * FROM products WHERE id = ?', [
            id
        ])
        return product[0]
    }

    static async getAllProduct() {
        const [products] = await db.promise().execute('SELECT * FROM products')
        return products
    }

    static async deleteProductById(id) {
        await db.promise().execute(`DELETE FROM products WHERE id = ${id}`)
    }

    static async updateProductById(id, title, price, groupimage) {
        await db.promise().execute(`UPDATE products SET title = "${title}", price = "${price}", images = "[${groupimage}]" WHERE id = ${id}`)
    }
}