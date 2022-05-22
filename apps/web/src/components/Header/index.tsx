import './Header.css'
import { Link } from 'react-router-dom'
import useUser from 'src/hooks/useUser'

export default function Header() {
	const { isLogged, logout } = useUser()

	return (
		<header className='gf-header'>
			{isLogged ? <button onClick={() => logout()}>Logout</button> : <Link to='/login'>Login</Link>}
		</header>
	)
}
