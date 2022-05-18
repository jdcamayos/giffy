import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useNearScreeen from 'src/hooks/useNearScreen'
import ListOfGifs from '../../components/ListOfGifs'
import Spinner from '../../components/Spinner'
import useGifs from '../../hooks/useGifs'

export default function SearchResults() {
	const { keyword } = useParams()
	const { loading, gifs, setPage } = useGifs({ keyword: String(keyword) })
	const externalRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
	const { isNearScreen } = useNearScreeen({ distance: '200px', externalRef, once: false })

	/* const handleNextPage = () => {
		setPage(prevPage => prevPage + 1)
	} */
	/* const handleNextPage = () => setPage(prevPage => prevPage + 1) */
	const debounceHandleNextpage = useCallback(
		debounce(() => setPage(prevPage => prevPage + 1), 1000),
		[]
	)

	useEffect(() => {
		if (isNearScreen) debounceHandleNextpage()
	}, [debounceHandleNextpage, isNearScreen])

	return (
		<>
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
