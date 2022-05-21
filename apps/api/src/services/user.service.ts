import fs from 'fs'
import path from 'path'
import { hashSync } from 'bcrypt'

interface NewUser {
	username: string
	password: string
}

interface User extends NewUser {
	id: number
}

interface DB {
	users: User[]
}

export default class UserService {
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

	async getAll() {
		const db = await this.read()
		return db.users
	}

	async getOne({ id }: { id: number }): Promise<User | undefined> {
		const db = await this.read()
		const user = db.users.find(u => u.id === id)
		if (user) {
			return user
		}
		return undefined
	}

	async getByUsername({ username }: { username: string }): Promise<User | undefined> {
		const db = await this.read()
		const user = db.users.find(u => u.username === username)
		if (user) {
			return user
		}
		return undefined
	}

	async create({ username, password }: NewUser) {
		const db = await this.read()

		const hashedPassword = hashSync(password, 10)

		let lastId
		if (db.users.length) {
			lastId = db.users[db.users.length - 1].id
		} else {
			lastId = 0
		}
		const newUser = {
			id: lastId + 1,
			username,
			password: hashedPassword,
		}
		const newDB = {
			...db,
			users: [...db.users, newUser],
		}
		await this.save(newDB)
		return newUser
	}

	async update({ user, id }: { user: NewUser; id: number }) {
		const db = await this.read()

		const oldUser = db.users.find(u => u.id === id)

		if (oldUser?.id) {
			const newUser = {
				id,
				...user,
			}
			const newDB = {
				...db,
				users: [...db.users.filter(u => u.id !== id), newUser],
			}
			this.save(newDB)
			return newUser
		}

		return {}
	}

	async delete({ id }: { id: number }) {
		const db = await this.read()
		const userDeleted = db.users.find(u => u.id === id)
		if (userDeleted?.id) {
			const newDB = {
				...db,
				users: [...db.users.filter(u => u.id !== id)],
			}
			this.save(newDB)
			return userDeleted
		}
		return {}
	}
}
