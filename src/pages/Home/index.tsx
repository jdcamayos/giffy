import './Home.css'
import { useNavigate } from 'react-router-dom'
import ListOfGifs from '../../components/ListOfGifs'
import useGifs from '../../hooks/useGifs'
import Spinner from '../../components/Spinner'
import TrendingSearches from '../../components/TrendingSearches'
import SearchForm from 'src/components/SearchForm'
import { Helmet } from 'react-helmet'

export default function Home() {
	const { loading, gifs } = useGifs()

	return (
		<>
			<Helmet>
				<title>Home | Giffy</title>
			</Helmet>
			<div>
				<SearchForm />
				<div className='Home-last-search'>
					<h3 className='Home-list-title'>Ultima busqueda</h3>
					{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}
				</div>
				<TrendingSearches />
			</div>
		</>
	)
}
