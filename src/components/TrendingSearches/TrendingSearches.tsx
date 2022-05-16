import { useEffect, useState } from 'react'
import getTrendingTerms from 'src/services/getTrendingTerms'
import Category from '../Category'

export default function TrendingSearches() {
	const [trends, setTrends] = useState([])

	useEffect(() => {
		getTrendingTerms().then(res => setTrends(res))
	}, [])

	return <Category title='Tendencias' items={trends} />
}
