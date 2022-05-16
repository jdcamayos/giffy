import './Home.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListOfGifs from '../../components/ListOfGifs'
import useGifs from '../../hooks/useGifs'
import Spinner from '../../components/Spinner'
import TrendingSearches from '../../components/TrendingSearches'

export default function Home() {
	const navigate = useNavigate()
	const [keyword, setKeyword] = useState('')
	const { loading, gifs } = useGifs()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Navigate to another route
		navigate(`/search/${keyword}`)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={keyword}
					onChange={handleChange}
					className='Home-search-input'
					placeholder='Search a gif here'
				/>
			</form>
			<div className='Home-last-search'>
				<h3 className='Home-list-title'>Ultima busqueda</h3>
				{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}
			</div>
			<TrendingSearches />
		</div>
	)
}
