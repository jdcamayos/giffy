import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import SearchForm from 'src/components/SearchForm'
import useNearScreeen from 'src/hooks/useNearScreen'
import ListOfGifs from '../../components/ListOfGifs'
import Spinner from '../../components/Spinner'
import useGifs from '../../hooks/useGifs'

export default function SearchResults() {
	const { keyword = 'random', rating = 'g' } = useParams()
	const { loading, gifs, setPage } = useGifs({ keyword: keyword, rating })
	const externalRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
	const { isNearScreen } = useNearScreeen({ distance: '200px', externalRef, once: false })
	const title = gifs ? `${gifs.length} Resultados de ${keyword}` : ''

	const debounceHandleNextpage = useCallback(
		debounce(() => setPage(prevPage => prevPage + 1), 1000),
		[]
	)

	useEffect(() => {
		if (isNearScreen) debounceHandleNextpage()
	}, [debounceHandleNextpage, isNearScreen])

	return (
		<>
			<Helmet>
				<title>{title} | Giffy</title>
			</Helmet>
			<SearchForm initialKeyword={keyword} initialRating={rating} />
			<h2 className='App-title'>{decodeURI(String(keyword))}</h2>
			{loading ? (
				<Spinner />
			) : (
				<>
					<ListOfGifs gifs={gifs} />
					<div id='visor' ref={externalRef}></div>
				</>
			)}
		</>
	)
}
