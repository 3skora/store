import db from '../database'
import User from '../types/user.type'

//CRUD operations
class UserModel {
  private table: string
  private info: string
  constructor() {
    this.table = 'users'
    this.info = 'id,email,user_name,first_name,last_name'
  }
  //create
  async create(u: User): Promise<User> {
    try {
      //open connection
      const conn = await db.connect()

      //run query
      const sql = `INSERT INTO ${this.table} (email,user_name,first_name,last_name,password)
       VALUES ($1,$2,$3,$4,$5) RETURNING ${this.info}`

      const result = await conn.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password
      ])

      // release connection
      conn.release()

      //return result
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to create ${u.user_name} : ${(error as Error).message}`)
    }
  }

  //get all users
  async getAll(): Promise<User[]> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to retrieving : ${(error as Error).message}`)
    }
  }

  //get specific user
  async getUser(id: string): Promise<User> {
    try {
      const conn = await db.connect()
      const sql = `SELECT ${this.info} FROM ${this.table} WHERE id=$1`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Unable to retrieve user ${id} : ${(error as Error).message}`)
    }
  }

  //update user's password
  async updateUserPassword(id: string, password: string): Promise<User> {
    try {
      const conn = await db.connect()
      const sql = `UPDATE ${this.table} SET password=$2 WHERE id=$1 RETURNING ${this.info},password`
      const result = await conn.query(sql, [id, password])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can not update password of user ${id} : ${(error as Error).message}`)
    }
  }

  //update user
  async updateUser(id: string, u: User): Promise<User> {
    try {
      const conn = await db.connect()
      const sql = `UPDATE ${this.table} SET email=$1, user_name=$2, first_name=$3, last_name=$4
      WHERE id=$5
      RETURNING ${this.info}`
      const result = await conn.query(sql, [u.email, u.user_name, u.first_name, u.last_name, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not UPDATE first name of user ${u.id} : ${(error as Error).message}`)
    }
  }

  //delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const conn = await db.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING ${this.info}`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Can Not DELETE user ${id} : ${(error as Error).message}`)
    }
  }

  //authenticate
}

export default UserModel
