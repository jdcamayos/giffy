import { Link } from 'react-router-dom'
import './Category.css'

interface Props {
	title: string
	items: string[]
}

export default function Category({ title, items }: Props) {
	return (
		<div className='Category-container'>
			<h4 className='Category-title'>{title}</h4>
			<ul className='Category-items'>
				{items.map((item, i) => (
					<li className='Category-item' key={`${title}-${i}`}>
						<Link className='Category-link' to={`search/${item}`}>{item}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
