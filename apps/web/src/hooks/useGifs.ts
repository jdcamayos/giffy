import { useContext, useEffect, useState } from 'react'
import getGifs, { Gif as GifType } from '../services/getGifs'
import GifsContext from '../context/GifsContext'

interface Props {
	keyword?: string | null
	rating?: string
}

const INITIAL_PAGE: number = 0

const useGifs = ({ keyword, rating }: Props = { keyword: null, rating: 'g' }) => {
	const [loading, setLoading] = useState(false)
	const [loadingNextPage, setLoadingNextPage] = useState(false)
	const [page, setPage] = useState(INITIAL_PAGE)
	const { gifs, setGifs } = useContext(GifsContext)
	const keywordToUse: string = keyword || window.localStorage.getItem('lastKeyword') || 'random'

	useEffect(() => {
		setLoading(true)
		/* Recovery last keyword */
		getGifs({ keyword: keywordToUse, rating }).then((gifs: GifType[]) => {
			setGifs(gifs)
			setLoading(false)
			/* Save last keyword */
			window.localStorage.setItem('lastKeyword', keywordToUse)
		})
	}, [keywordToUse, setGifs, rating])

	useEffect(() => {
		if (page === INITIAL_PAGE) return

		setLoadingNextPage(true)
		getGifs({ keyword: keywordToUse, page, rating }).then(nextGifs => {
			setGifs((prevGifs: GifType[]) => prevGifs.concat(nextGifs))
			setLoadingNextPage(false)
		})
	}, [keywordToUse, page, setGifs, rating])

	return { loading, gifs, loadingNextPage, setPage }
}

export default useGifs
