import './Home.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ListOfGifs from '../../components/ListOfGifs'
import useGifs from '../../hooks/useGifs'
import Spinner from '../../components/Spinner'

const POPULAR_GIFS: string[] = ['Matrix', 'Colombia', 'Venezuela', 'Peru', 'Argentina']

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
			<h3 className='Home-list-title'>Ultima busqueda</h3>
			{loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}
			<h3 className='Home-list-title'>Los gifs mas populares</h3>
			<ul className='Home-list-container'>
				{POPULAR_GIFS.map((popularGif, i) => (
					<li key={`popularGif-${i}`} className='Home-list-item'>
						<Link to={`/search/${popularGif}`} className='Home-list-link'>
							Gifs de {popularGif}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
