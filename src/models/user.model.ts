import db from '../database'
import User from '../types/user.type'

//CRUD operations
class UserModel {
  //create
  async create(u: User): Promise<User> {
    try {
      //open connection
      const conn = await db.connect()

      //run query
      const sql = `INSERT INTO users (email,user_name,first_name,last_name,password)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`

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
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Unable to retrieving : ${(error as Error).message}`)
    }
  }

  //get specific user

  //update user

  //delete user

  //authenticate
}

export default UserModel
