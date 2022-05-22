import { memo } from 'react'
import { Link } from 'react-router-dom'
import Fav from '../Fav'
import './Gif.css'

type Props = {
	id: string
	title: string
	url: string
}
function Gif({ id, title, url }: Props) {
	return (
		<div>
			<div className='Gif'>
				<Link className='Gif-link' to={`/gif/${id}`}>
					<img src={url} alt={title} />
				</Link>
				<div className='Gif-buttons'>
					<h4>{title}</h4>
					<Fav id={id} />
				</div>
			</div>
		</div>
	)
}

export default memo(Gif, (prevProps, nextProps) => {
	return prevProps.id === nextProps.id
})
