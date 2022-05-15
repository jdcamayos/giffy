import { useContext, useEffect, useState } from 'react'
import getGifs, { Gif as GifType } from '../services/getGifs'
import GifsContext from '../context/GifsContext'

interface Props {
	keyword?: string | null
}

const useGifs = ({ keyword }: Props = { keyword: null }) => {
	const [loading, setLoading] = useState(false)
	const { gifs, setGifs } = useContext(GifsContext)
	/* console.log(context) */
	/* const [gifs, setGifs] = useState<GifType[]>([]) */

	useEffect(() => {
		setLoading(true)
		/* Recovery last keyword */
		const keywordToUse: string = keyword || window.localStorage.getItem('lastKeyword') || 'random'
		getGifs({ keyword: keywordToUse }).then((gifs: GifType[]) => {
			setGifs(gifs)
			setLoading(false)
			/* Save last keyword */
			window.localStorage.setItem('lastKeyword', keywordToUse)
		})
	}, [keyword])

	return { loading, gifs }
}

export default useGifs
