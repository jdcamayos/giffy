import './Fav.css'
import { useNavigate } from 'react-router-dom'
import useUser from 'src/hooks/useUser'

export default function Fav({ id }: { id: string }) {
	const { isLogged } = useUser()
	const navigate = useNavigate()
	const handleClick = () => {
		if (!isLogged) return navigate('/login')
		alert(`Add to Fav ${id}`)
	}
	return (
		<button className='Fav-button' onClick={handleClick}>
			<span aria-label='Fav Gif' role='img'>
				❤
			</span>
		</button>
	)
}
