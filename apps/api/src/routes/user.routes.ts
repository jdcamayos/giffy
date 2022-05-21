import { Express, Router } from 'express'
import UserService from '../services/user.service'

export interface User {
	username: string
	password: string
}

export default function users(app: Express) {
	const router = Router()
	app.use('/api/users', router)
	const userService = new UserService()

	router.get('/', async function (req, res, next) {
		try {
			const users = await userService.getAll()
			return res.json({
				message: 'Users found',
				data: users,
			})
		} catch (error) {
			next(error)
		}
	})

	router.get('/:userId', async function (req, res, next) {
		try {
			const id = Number(req.params.userId)
			const user = await userService.getOne({ id })
			return res.json({
				message: 'User found',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	})

	router.post('/', async function (req, res, next) {
		try {
			const user = req.body
			const userCreated = await userService.create(user)
			return res.json({
				message: 'User create',
				data: userCreated,
			})
		} catch (error) {
			next(error)
		}
	})

	router.put('/:userId', async function (req, res, next) {
		try {
			const user = req.body
			const id = Number(req.params.userId)
			const userUpdated = await userService.update({ id, user })
			return res.json({
				message: 'User update',
				data: userUpdated,
			})
		} catch (error) {
			next(error)
		}
	})

	router.delete('/:userId', async function (req, res, next) {
		try {
			const id = Number(req.params.userId)
			const userDeleted = await userService.delete({ id })
			return res.json({
				message: 'User delete',
				data: userDeleted,
			})
		} catch (error) {
			next(error)
		}
	})
}
