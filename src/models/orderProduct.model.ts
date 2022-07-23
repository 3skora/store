import db from '../database'
import OrderProduct from '../types/orderProduct.type'

class OrderProductModel {
  private table: string
  private info: string
  constructor() {
    this.table = 'order_product'
    this.info = 'id,product_id,quantity,order_id'
  }

  //create OrderProduct
  async create(o: OrderProduct): Promise<OrderProduct> {
    try {
      //open connection
      const conn = await db.connect()

      //run query
      const sql = `INSERT INTO ${this.table} (product_id,quantity,order_id)
           VALUES ($1,$2,$3) RETURNING ${this.info}`

      const result = await conn.query(sql, [o.product_id, o.quantity, o.order_id])

      // release connection
      conn.release()

      //return result
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Unable to create order_product ${o.product_id} : quantity ${o.quantity} : ${
          (error as Error).message
        }`
      )
    }
  }

  //get all OrderProduct
  async getAll(): Promise<OrderProduct[]> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to retrieve all OrderProduct items : ${(error as Error).message}`)
    }
  }

  //get specific OrderProduct
  async getOrderProduct(id: string): Promise<OrderProduct | null> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table} WHERE id=$1`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows.length ? result.rows[0] : null
    } catch (error) {
      throw new Error(`Unable to retrieve OrderProduct ${id} : ${(error as Error).message}`)
    }
  }

  //get all orderProducts of a user and filter by status option
  //   async getOrderProductsOfUser(user_id: string, status?: string): Promise<OrderProduct[] | null> {
  //     try {
  //       const conn = await db.connect()
  //       let condition = `AND status=$2`
  //       if (!status) condition = ''
  //       const sql = `SELECT ${this.info} FROM ${this.table} WHERE user_id=$1 ${condition}`
  //       let result
  //       status
  //         ? (result = await conn.query(sql, [user_id, status]))
  //         : (result = await conn.query(sql, [user_id]))

  //       conn.release()
  //       return result.rows.length ? result.rows : null
  //     } catch (error) {
  //       throw new Error(`Unable to retrieve OrderProducts of ${user_id} : ${(error as Error).message}`)
  //     }
  //   }

  //update OrderProduct
  async updateOrderProductQuantity(id: string, o: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await db.connect()
      const sql = `UPDATE ${this.table} SET quantity=$1 WHERE id=$2 RETURNING ${this.info}`
      const result = await conn.query(sql, [o.quantity, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can Not UPDATE Quantity of OrderProduct ${o.id} : ${(error as Error).message}`
      )
    }
  }

  //delete OrderProduct
  async deleteOrderProduct(id: string): Promise<OrderProduct> {
    try {
      const conn = await db.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING ${this.info}`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not DELETE OrderProduct ${id} : ${(error as Error).message}`)
    }
  }
}

export default OrderProductModel
