import db from '../database'
import Product from '../types/product.type'

class ProductModel {
  private table: string
  private info: string
  constructor() {
    this.table = 'products'
    this.info = 'id,name,price,category,description'
  }

  //create product
  async create(p: Product): Promise<Product> {
    try {
      //open connection
      const conn = await db.connect()

      //run query
      const sql = `INSERT INTO ${this.table} (name,price,category,description)
           VALUES ($1,$2,$3,$4) RETURNING ${this.info}`

      const result = await conn.query(sql, [p.name, p.price, p.category, p.description])

      // release connection
      conn.release()

      //return result
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create ${p.name} : ${(error as Error).message}`)
    }
  }

  //get all Products
  async getAll(): Promise<Product[]> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to retrieve all products : ${(error as Error).message}`)
    }
  }

  //get specific Product
  async getProduct(id: string): Promise<Product | null> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table} WHERE id=$1`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows.length ? result.rows[0] : null
    } catch (error) {
      throw new Error(`Unable to retrieve Product ${id} : ${(error as Error).message}`)
    }
  }

  //get specific Product
  async getProductByCategory(category: string): Promise<Product | null> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table} WHERE category=$1`
      const result = await conn.query(sql, [category])
      conn.release()
      return result.rows.length ? result.rows[0] : null
    } catch (error) {
      throw new Error(`Unable to retrieve Products of ${category} : ${(error as Error).message}`)
    }
  }

  //update Product
  async updateProduct(id: string, p: Product): Promise<Product> {
    try {
      const conn = await db.connect()
      const sql = `UPDATE ${this.table} SET name=$1, price=$2, category=$3, description=$4
          WHERE id=$5
          RETURNING ${this.info}`
      const result = await conn.query(sql, [p.name, p.price, p.category, p.description, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not UPDATE first name of Product ${p.id} : ${(error as Error).message}`)
    }
  }

  //delete Product
  async deleteProduct(id: string): Promise<Product> {
    try {
      const conn = await db.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING ${this.info}`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not DELETE Product ${id} : ${(error as Error).message}`)
    }
  }
}

export default ProductModel
