import { createContext, ReactNode, useEffect, useState } from 'react'
import getFavs from 'src/services/getFavs'

interface Favorite {
	id: number
	userId: number
	gifId: string
}

interface ContextType {
	auth: {
		token: string
	}
	setAuth: Function
	favs: Favorite[]
	setFavs: Function
}

const Context = createContext<ContextType>({} as ContextType)

interface Props {
	children: ReactNode
}

const initialState = () => {
	const token =
		typeof window.sessionStorage.getItem('token') === 'string' ? String(window.sessionStorage.getItem('token')) : ''
	return { token }
}

export function UserContextProvider({ children }: Props) {
	const [auth, setAuth] = useState(initialState())
	const [favs, setFavs] = useState([])

	useEffect(() => {
		if (!auth.token) {
			setFavs([])
		} else {
			getFavs({ token: auth.token }).then(setFavs)
		}
	}, [auth.token])
	return <Context.Provider value={{ auth, setAuth, favs, setFavs }}>{children}</Context.Provider>
}

export default Context
