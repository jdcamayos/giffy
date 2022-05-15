import { useParams } from 'react-router-dom'
import ListOfGifs from '../components/ListOfGifs'
import Spinner from '../components/Spinner'
import useGifs from '../hooks/useGifs'

export default function SearchResults() {
	const { keyword } = useParams()
	const { loading, gifs } = useGifs({ keyword: String(keyword) })

	return <>{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}</>
}
