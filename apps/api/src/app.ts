import { errorHandler, logErrors, wrapErrors } from './middleware/error.handler'
import auth from './routes/auth.routes'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import notFoundHandler from './middleware/notFound.handler'
import userFavorites from './routes/userFavorite.routes'
import users from './routes/user.routes'

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Routes
users(app)
userFavorites(app)
auth(app)
app.get('/ping', (req, res, next) => {
	return res.json({
		message: 'pong',
	})
})

// Catch 404
app.use(notFoundHandler)

// Errors Middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

export default app
