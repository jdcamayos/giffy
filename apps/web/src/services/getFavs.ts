import jwt from 'jwt-decode'
const ENDPOINT = 'http://localhost:4000'

interface TokenDecoded {
	id: number
	iss: string
	exp: number
	iat: number
}

export default function getFavs({ token }: { token: string }) {
	const { id }: TokenDecoded = jwt(token)
	return fetch(`${ENDPOINT}/api/user-favorites/${id}`, {
		method: 'GET',
	})
		.then(res => {
			if (!res.ok) throw new Error('Response is NOT ok!')
			return res.json()
		})
		.then(res => res.data)
}
