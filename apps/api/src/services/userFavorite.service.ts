import fs from 'fs'
import path from 'path'

interface NewUserFavorite {
	userId: number
	gifId: string
}

interface UserFavorite extends NewUserFavorite {
	id: number
}

interface DB {
	userFavorites: UserFavorite[]
}

export default class UserFavoriteService {
	async read() {
		const dbStr = await fs.promises.readFile(path.resolve('db.json'), 'utf-8')
		const db: DB = JSON.parse(dbStr)
		return db
	}

	async save(db: any) {
		const dbStr = JSON.stringify(db)
		await fs.promises.writeFile(path.resolve('db.json'), dbStr)
		return db
	}

	async getByUser({ userId }: { userId: number }) {
		const db = await this.read()
		const userFavorites = db.userFavorites.filter(uf => uf.userId === userId)
		return userFavorites
	}

	async create({ userId, gifId }: NewUserFavorite) {
		const db = await this.read()
		let lastId
		if (db.userFavorites.length) {
			lastId = db.userFavorites[db.userFavorites.length - 1].id
		} else {
			lastId = 0
		}
		const newUserFavorite = {
			id: lastId + 1,
			userId,
			gifId,
		}
		const newDB = {
			...db,
			userFavorites: [...db.userFavorites, newUserFavorite],
		}
		await this.save(newDB)
		return newUserFavorite
	}

	async delete({ id }: { id: number }) {
		const db = await this.read()
		const userFavoriteDeleted = db.userFavorites.find(uf => uf.id === id)
		if (userFavoriteDeleted?.id) {
			const newDB = {
				...db,
				userFavorites: [...db.userFavorites.filter(uf => uf.id !== id)],
			}
			this.save(newDB)
			return userFavoriteDeleted
		}
		return {}
	}
}
