import { useParams } from 'react-router-dom'
import ListOfGifs from '../../components/ListOfGifs'
import Spinner from '../../components/Spinner'
import useGifs from '../../hooks/useGifs'

export default function SearchResults() {
	const { keyword } = useParams()
	const { loading, gifs, setPage } = useGifs({ keyword: String(keyword) })

	const handleNextPage = () => {
		setPage(prevPage => prevPage + 1)
	}

	return (
		<>
			<h2 className='App-title'>{decodeURI(String(keyword))}</h2>
			{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}
			<button onClick={handleNextPage}>Get next page</button>
		</>
	)
}
