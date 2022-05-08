import './App.css'
import ListOfGifs from './components/ListOfGifs'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function App() {
	return (
		<Router>
			<div className='App'>
				<section className='App-content'>
					<h1>App</h1>
					<Link to="/gif/panda">Gifs de pandas</Link>
					<Link to="/gif/colombia">Gifs de Colombia</Link>
					<Link to="/gif/china">Gifs de China</Link>
					<Routes>
						<Route path='/gif/:keyword' element={<ListOfGifs />} />
					</Routes>
					{/* <ListOfGifs keyword='panda' /> */}
				</section>
			</div>
		</Router>
	)
}
