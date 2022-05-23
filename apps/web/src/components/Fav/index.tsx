import './Fav.css'
import { useNavigate } from 'react-router-dom'
import useUser from 'src/hooks/useUser'

export default function Fav({ id }: { id: string }) {
	const { isLogged, addFav, favs } = useUser()
	console.log(favs)
	const navigate = useNavigate()
	const isFaved = favs.some(favId => favId.gifId === id)
	const handleClick = () => {
		if (!isLogged) return navigate('/login')
		/* alert(`Add to Fav ${id}`) */
		addFav({ id })
	}
	const [label, emoji] = isFaved ? ['Remove Gif from favorites', '👎'] : ['Add Gif to favorites', '❤']


	return (
		<button className='Fav-button' onClick={handleClick}>
			<span aria-label={label} role='img'>
				{emoji}
			</span>
		</button>
	)
}
