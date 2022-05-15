import './ListOfGifs.css'
import Gif from '../Gif'
import { Gif as GifType } from '../../services/getGifs'

export default function ListOfGifs({ gifs }: { gifs: GifType[] }) {
	return (
		<div className='Gif-container'>
			{gifs.map((gif: GifType) => (
				<Gif id={gif.id} key={gif.id} title={gif.title} url={gif.url} />
			))}
		</div>
	)
}
