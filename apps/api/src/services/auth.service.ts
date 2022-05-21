import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserService from './user.service'

interface Credentials {
	username: string
	password: string
}

interface PostCredentials extends Credentials {
	id: number
}

export default class AuthService {
	userService
	jwtSecret

	constructor() {
		this.userService = new UserService()
		this.jwtSecret = process.env.JWT_SECRET || 'supersecret'
	}

	postAuthorize(credentials: PostCredentials) {
		const payload = {
			iss: credentials.username,
			exp: Math.round(Date.now() / 1000) + 3600,
		}
		const token = jwt.sign(payload, this.jwtSecret)
		return token
	}

	async login(credentials: Credentials) {
		const user = await this.userService.getByUsername({ username: credentials.username })
		if (!user) {
			throw Error('User not found')
		}
		const verify = await bcrypt.compare(credentials.password, user.password)
		if (!verify) {
			throw Error('Password incorrect')
		}
		return this.postAuthorize(user)
	}

	async register(credentials: Credentials) {
		const user = await this.userService.create(credentials)
		if (!user) {
			throw Error('Register error')
		}
		return this.postAuthorize(user)
	}
}
