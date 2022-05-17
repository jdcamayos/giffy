import './App.css'
import logo from './logo.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
/* import Home from './pages/Home' */
import SearchResults from './pages/SearchResults'
import Details from './pages/Details'
import StaticContext, { contextValue } from './context/StaticContext'
import { GifsContextProvider } from './context/GifsContext'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))

export default function App() {
	return (
		<StaticContext.Provider value={contextValue}>
			<Router>
				<div className='App'>
					<Suspense fallback={null}>
						<section className='App-content'>
							<Link to='/' className='App-title-container'>
								<img src={logo} alt='Logo' className='App-logo' />
								<h1 className='App-title'>Giffy</h1>
							</Link>
							<GifsContextProvider>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/search/:keyword' element={<SearchResults />} />
									<Route path='/gif/:id' element={<Details />} />
								</Routes>
							</GifsContextProvider>
							{/* <ListOfGifs keyword='panda' /> */}
						</section>
					</Suspense>
				</div>
			</Router>
		</StaticContext.Provider>
	)
}
