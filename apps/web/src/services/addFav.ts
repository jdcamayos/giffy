import jwt from 'jwt-decode'
const ENDPOINT = 'http://localhost:4000'

interface TokenDecoded {
	id: number
	iss: string
	exp: number
	iat: number
}

export default function addFav({ id, token }: { id: string; token: string }) {
	const tokenDecodedStr: TokenDecoded = jwt(token)
	return fetch(`${ENDPOINT}/api/user-favorites`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ gifId: id, userId: tokenDecodedStr.id }),
	})
		.then(res => {
			if (!res.ok) throw new Error('Response is NOT ok!')
			return res.json()
		})
		.then(res => res.data)
}
