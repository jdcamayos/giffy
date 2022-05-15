import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Gif from '../components/Gif'
import StaticContext from '../context/StaticContext'
import useGlobalGifs from '../hooks/useGlobalGifs'
import { Gif as GifType } from '../services/getGifs'

export default function Detail() {
	const { id } = useParams()
	const staticContext = useContext(StaticContext)
	const { gifs } = useGlobalGifs()
	const gif: GifType | undefined = gifs.find(singleGif => singleGif.id === id)
	console.log(staticContext)

	return (
		<div>
			<h3>Gif {gif?.title}</h3>
			{gif && <Gif {...gif} />}
		</div>
	)
}
