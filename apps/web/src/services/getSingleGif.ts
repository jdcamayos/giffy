const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY

type ApiResponse = {
	data: any[]
}

export type Gif = {
	id: string
	title: string
	url: string
}

const fromApiResponseToGifs = (apiResponse: ApiResponse): Gif => {
	const { data }: { data: any } = apiResponse
	const { images, title, id } = data
	const { url } = images.downsized_medium
	return { id, title, url }
}

export default function getSingleGif({ id }: { id: string }) {
	return fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${giphyApiKey}`)
		.then(res => res.json())
		.then(fromApiResponseToGifs)
}
