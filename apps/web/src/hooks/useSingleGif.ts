import { useEffect, useState } from 'react'
import { Gif } from 'src/services/getGifs'
import getSingleGif from 'src/services/getSingleGif'
import useGifs from './useGifs'

export default function useSingleGif({ id }: { id: string | undefined }): {
	gif: Gif | undefined
	isLoading: boolean
	isError: boolean
} {
	const { gifs } = useGifs()
	const gifFromCache = gifs.find(singleGif => singleGif.id === id)
	const [gif, setGif] = useState<Gif | undefined>(gifFromCache)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		if (!gif && id) {
			setIsLoading(true)
			getSingleGif({ id })
				.then(gif => {
					setGif(gif)
					setIsLoading(false)
				})
				.catch(err => {
					setIsLoading(false)
					setIsError(true)
				})
		}
	}, [gif, id])

	/* if (!id || !gif) set undefined */

	return { gif, isLoading, isError }
}
