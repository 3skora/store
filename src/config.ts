import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  PEPPER,
  SALT,
  TOKEN_SECRET
} = process.env

export default {
  port: PORT || 3000,
  host: POSTGRES_HOST,
  dbPort: POSTGRES_PORT,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  pepper: PEPPER,
  salt: SALT,
  tokenSecret: TOKEN_SECRET
}
