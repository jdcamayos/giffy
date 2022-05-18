import './Home.css'
import { useNavigate } from 'react-router-dom'
import ListOfGifs from '../../components/ListOfGifs'
import useGifs from '../../hooks/useGifs'
import Spinner from '../../components/Spinner'
import TrendingSearches from '../../components/TrendingSearches'
import SearchForm from 'src/components/SearchForm'
import { useCallback } from 'react'
import { Helmet } from 'react-helmet'

export default function Home() {
	const navigate = useNavigate()
	const { loading, gifs } = useGifs()

	const handleSubmit = useCallback(
		({ keyword }: { keyword: string }) => {
			// Navigate to another route
			navigate(`/search/${keyword}`)
		},
		[navigate]
	)

	return (
		<>
			<Helmet>
				<title>Home | Giffy</title>
			</Helmet>
			<div>
				<SearchForm onSubmit={handleSubmit} />
				<div className='Home-last-search'>
					<h3 className='Home-list-title'>Ultima busqueda</h3>
					{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}
				</div>
				<TrendingSearches />
			</div>
		</>
	)
}
