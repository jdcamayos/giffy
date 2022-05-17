const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY

/* type Image = {
	images: {
		downsized_medium: {
			url: string
		}
	}
	id: string
	title: string
} */

export type Gif = {
	id: string
	title: string
	url: string
}

type ApiResponse = {
	data: any[]
}

const fromApiResponseToGifs = (apiResponse: ApiResponse): Gif[] => {
	const { data = [] } = apiResponse
	if (Array.isArray(data)) {
		return data.map(({ images, id, title }) => ({
			id,
			title,
			url: images.downsized_medium.url,
		}))
	} else {
		return []
	}
}

const getGifs = async ({ limit = 5, keyword = 'morty', page = 0 } = {}) => {
	const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${keyword}&limit=${limit}&offset=${
		page * limit
	}&rating=g&lang=en`

	return fetch(apiUrl)
		.then(res => res.json())
		.then(fromApiResponseToGifs)
		.catch(err => {
			console.log(err)
			return []
		})
}

export default getGifs
