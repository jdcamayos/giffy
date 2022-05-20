const fromApiResponseToGifs = (apiResponse: any) => {
	const { data = [] } = apiResponse
	return data
}

export default function getTrendingTerms() {
	const apiUrl = `https://api.giphy.com/v1/trending/searches?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
	return fetch(apiUrl)
		.then(res => res.json())
		.then(fromApiResponseToGifs)
}
