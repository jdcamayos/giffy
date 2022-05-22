const ENDPOINT = 'http://localhost:4000'

export default function login({ username, password }: { username: string; password: string }) {
	return fetch(`${ENDPOINT}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	})
		.then(res => {
			if (!res.ok) throw new Error('Response is NOT ok!')
			return res.json()
		})
		.then(res => res.data)
}
