import { useCallback, useContext, useState } from 'react'
import Context from 'src/context/UserContext'
import loginService from 'src/services/login'

export default function useUser() {
	const { auth, setAuth, favs, setFavs } = useContext(Context)
	const [state, setState] = useState({ loading: false, error: false })

	const login = useCallback(
		({ username, password }: { username: string; password: string }) => {
			setState({ loading: true, error: false })
			loginService({ username, password })
				.then(token => {
					window.sessionStorage.setItem('token', token)
					setState({ loading: false, error: false })
					setAuth({ token })
				})
				.catch(error => {
					window.sessionStorage.removeItem('token')
					setState({ loading: false, error })
					console.log(error)
				})
		},
		[setAuth]
	)

	const fav = useCallback(({ id }: { id: string }) => {
		addFavService({ id, token: auth.token })
			.then(favs => setFavs(favs))
			.catch(err => console.log(err))
	}, [])

	const logout = useCallback(() => {
		setAuth({ token: '' })
		window.sessionStorage.removeItem('token')
	}, [setAuth])

	return {
		isLogged: Boolean(auth.token),
		isLoginLoading: state.loading,
		hasLoginError: state.error,
		login,
		logout,
	}
}
