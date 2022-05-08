import { useState, useEffect } from 'react'
import Gif from './Gif'
import getGifs, { Gif as GifType } from '../services/getGifs'
import { useParams } from 'react-router-dom'

type State = {
	results: GifType[]
	loading: boolean
}

export default function ListOfGifs() {
	const { keyword } = useParams()
	const [gifs, setGifs] = useState<State>({
		loading: false,
		results: [],
	})

	useEffect(() => {
		setGifs(actualGifs => ({ loading: true, results: actualGifs.results }))
		getGifs({ keyword }).then((gifs: GifType[]) => {
			setGifs({ loading: false, results: gifs })
		})
	}, [keyword])

	if (gifs.loading)
		<span>
			Cargando <i>⌛</i>
		</span>

	return (
		<div>
			{gifs.results.map((gif: GifType) => (
				<Gif id={gif.id} key={gif.id} title={gif.title} url={gif.url} />
			))}
		</div>
	)
}
