import { Express, Router } from 'express'
import UserFavoriteService from '../services/userFavorite.service'

export interface UserFavorite {
	userId: number
	gifId: string
}

export default function userFavorites(app: Express) {
	const router = Router()
	app.use('/api/user-favorites', router)
	const userFavoriteService = new UserFavoriteService()

	router.get('/:userId', async function (req, res, next) {
		try {
			const userId = Number(req.params.userId)
			const userFavorites = await userFavoriteService.getByUser({ userId })
			return res.json({
				message: 'User Favorites found',
				data: userFavorites,
			})
		} catch (error) {
			next(error)
		}
	})

	router.post('/', async function (req, res, next) {
		try {
			const newUserFavorite = req.body
			const userFavoriteCreated = await userFavoriteService.create(newUserFavorite)
			return res.json({
				message: 'User Favorite create',
				data: userFavoriteCreated,
			})
		} catch (error) {
			next(error)
		}
	})

	router.delete('/:userId', async function (req, res, next) {
		try {
			const id = Number(req.params.userId)
			const userFavoriteDeleted = await userFavoriteService.delete({ id })
			return res.json({
				message: 'User Favorite delete',
				data: userFavoriteDeleted,
			})
		} catch (error) {
			next(error)
		}
	})
}
