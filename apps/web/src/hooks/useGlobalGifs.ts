import { useContext } from 'react'
import GifsContext from '../context/GifsContext'

const useGlobalGifs = () => {
	const { gifs } = useContext(GifsContext)
	return { gifs }
}

export default useGlobalGifs
