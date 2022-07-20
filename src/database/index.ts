import { Pool } from 'pg'
import config from '../config'

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  port: parseInt(config.dbPort as string)
})

pool.on('error', (error: Error) => {
  console.error(error.message)
})

export default pool
