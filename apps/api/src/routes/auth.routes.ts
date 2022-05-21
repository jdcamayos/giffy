import { Express, Router } from 'express'
import AuthService from '../services/auth.service'

export default function auth(app: Express) {
	const router = Router()
	app.use('/api/auth', router)
	const authService = new AuthService()

	router.post('/login', async function (req, res, next) {
		try {
			const credentials = req.body
			const token = await authService.login(credentials)
			return res.json({
				message: 'Login successfully',
				data: token,
			})
		} catch (error) {
			next(error)
		}
	})

	router.post('/register', async function (req, res, next) {
		try {
			const credentials = req.body
			const token = await authService.register(credentials)
			return res.json({
				message: 'Register successfully',
				data: token,
			})
		} catch (error) {
			next(error)
		}
	})
}
