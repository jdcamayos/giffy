import './Gif.css'

type Props = {
	id: string
	title: string
	url: string
}

export default function Gif({ id, title, url }: Props) {
	return (
		<a className='Gif' href={`#${id}`}>
			<h4>{title}</h4>
			<img src={url} alt={title} />
		</a>
	)
}
