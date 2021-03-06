import { memo } from 'react'
import { Link } from 'react-router-dom'
import './Gif.css'

type Props = {
	id: string
	title: string
	url: string
}
function Gif({ id, title, url }: Props) {
	return (
		<Link className='Gif-link' to={`/gif/${id}`}>
			<div className='Gif'>
				<img src={url} alt={title} />
				<h4>{title}</h4>
			</div>
		</Link>
	)
}

export default memo(Gif, (prevProps, nextProps) => {
	return prevProps.id === nextProps.id
})
