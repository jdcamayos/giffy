import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from 'src/hooks/useUser'

export default function Login() {
	const { isLogged, login, isLoginLoading, hasLoginError } = useUser()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		login({ username, password })
		/* navigate('/') */
	}

	useEffect(() => {
		if (isLogged) navigate('/')
	}, [isLogged, navigate])

	return (
		<>
			<h2>Login</h2>
			{isLoginLoading && <strong>Checking credentials</strong>}
			{!isLoginLoading && (
				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
					<input type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
					<button>Login</button>
				</form>
			)}
			{hasLoginError && <strong>Credentials are invalid</strong>}
		</>
	)
}
