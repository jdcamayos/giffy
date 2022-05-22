import { createContext, ReactNode, useState } from 'react'

interface ContextType {
	auth: {
		token: string
	}
	setAuth: Function
	favs: string[]
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
	return <Context.Provider value={{ auth, setAuth, favs, setFavs }}>{children}</Context.Provider>
}

export default Context
