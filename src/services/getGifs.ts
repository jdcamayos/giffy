const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY

type Image = {
	images: {
		downsized_medium: {
			url: string
		}
	}
	id: string
	title: string
}

export type Gif = {
	id: string
	title: string
	url: string
}

const getGifs = async ({ keyword = 'morty' } = {}) => {
	try {
		const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`
		const res = await fetch(apiUrl)
		const response = await res.json()
		const { data } = response
		const gifs: Gif[] = data.map((image: Image): Gif => {
			const { url } = image.images.downsized_medium
			const { id, title } = image
			return {
				id,
				title,
				url,
			}
		})
		return gifs
	} catch (error) {
		console.log(error)
		return []
	}
}

export default getGifs
