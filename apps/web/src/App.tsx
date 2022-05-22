import './App.css'
import logo from './logo.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import SearchResults from './pages/SearchResults'
import Details from './pages/Details'
import { GifsContextProvider } from './context/GifsContext'
import { lazy, Suspense } from 'react'
import Login from './pages/Login'
import { UserContextProvider } from './context/UserContext'

const Home = lazy(() => import('./pages/Home'))

export default function App() {
	return (
		<UserContextProvider>
			<Router>
				<div className='App'>
					<Suspense fallback={null}>
						<section className='App-content'>
							<Header />
							<Link to='/' className='App-title-container'>
								<img src={logo} alt='Logo' className='App-logo' />
								<h1 className='App-title'>Giffy</h1>
							</Link>
							<GifsContextProvider>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/search/:keyword/' element={<SearchResults />} />
									<Route path='/search/:keyword/:rating' element={<SearchResults />} />
									<Route path='/gif/:id' element={<Details />} />
									<Route path='/login' element={<Login />} />
									<Route path='*' element={<h1>404</h1>} />
								</Routes>
							</GifsContextProvider>
						</section>
					</Suspense>
				</div>
			</Router>
		</UserContextProvider>
	)
}
