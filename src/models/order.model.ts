import db from '../database'
import Order from '../types/order.type'

class OrderModel {
  private table: string
  private joinedTables: string
  private info: string
  private orderProductInfo: string
  private joinedInfo: string
  constructor() {
    this.table = 'orders'
    this.info = 'id,user_id,status'
    this.orderProductInfo = 'product_id,quantity'
    this.joinedTables = 'orders o INNER JOIN order_product op ON o.id = op.order_id'
    this.joinedInfo = `o.id,user_id,status,${this.orderProductInfo}`
  }

  //create Order
  async create(o: Order): Promise<Order> {
    try {
      //open connection
      const conn = await db.connect()

      //run query
      const sql = `INSERT INTO ${this.table} (user_id,status)
           VALUES ($1,$2) RETURNING ${this.info}`

      const result = await conn.query(sql, [o.user_id, o.status])

      // release connection
      conn.release()

      //return result
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create order to user ${o.user_id} : ${(error as Error).message}`)
    }
  }

  //get all Orders
  async getAll(): Promise<Order[]> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.joinedInfo} FROM ${this.joinedTables}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to retrieve all Orders : ${(error as Error).message}`)
    }
  }

  //get specific Order
  async getOrder(id: string): Promise<Order[] | null> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.joinedInfo} FROM ${this.joinedTables} WHERE o.id=$1`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows.length ? result.rows : null
    } catch (error) {
      throw new Error(`Unable to retrieve Order ${id} : ${(error as Error).message}`)
    }
  }

  //get all orders of a user and filter by status option
  async getOrdersOfUser(user_id: string, status?: string): Promise<Order[] | null> {
    try {
      const conn = await db.connect()
      let condition = `AND o.status=$2`
      if (!status) condition = ''
      const sql = `SELECT ${this.joinedInfo} FROM ${this.joinedTables} WHERE o.user_id=$1 ${condition}`
      let result
      status
        ? (result = await conn.query(sql, [user_id, status]))
        : (result = await conn.query(sql, [user_id]))

      conn.release()
      return result.rows.length ? result.rows : null
    } catch (error) {
      throw new Error(`Unable to retrieve Orders of ${user_id} : ${(error as Error).message}`)
    }
  }

  //update Order
  async updateOrderStatus(id: string, o: Order): Promise<Order> {
    try {
      const conn = await db.connect()
      const sql = `UPDATE ${this.table} SET status=$1 WHERE id=$2 RETURNING ${this.info}`
      const result = await conn.query(sql, [o.status, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not UPDATE status of Order ${o.id} : ${(error as Error).message}`)
    }
  }

  //delete Order
  async deleteOrder(id: string): Promise<Order> {
    try {
      const conn = await db.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING ${this.info}`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not DELETE Order ${id} : ${(error as Error).message}`)
    }
  }
}

export default OrderModel
