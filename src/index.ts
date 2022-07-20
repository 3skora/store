import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import db from './database'
import routes from './routes'

const PORT = config.port
// create an instance server
const app: Application = express()

// Middleware
// Middleware to pare incoming requests
app.use(express.json())

// HTTP request logger middleware
app.use(morgan('short'))

// HTTP security middleware
app.use(helmet())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'too many requests, please try after 15 min'
})

app.use(limiter)

// test db
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows[0].now)
    })
    .catch((err) => {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release()
      console.log(err.stack)
    })
})

app.use('/api', routes)
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World'
  })
})

app.get('/err', (req: Request, res: Response) => {
  throw new Error('hhhhhhhhh')
  // res.json({
  //   message: 'Hello World'
  // })
})

//add all routes here

//================
// Handle error for route not exist
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Page Not Found'
  })
})

app.use(errorMiddleware)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
