import { createContext, ReactNode, useState } from 'react'
import { Gif } from '../services/getGifs'

interface ContextType {
	gifs: Gif[]
	setGifs: Function
}

const Context = createContext<ContextType>({} as ContextType)

interface Props {
	children: ReactNode
}

export function GifsContextProvider({ children }: Props) {
	const [gifs, setGifs] = useState<Gif[]>([])
	return <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider>
}

export default Context
