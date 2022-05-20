import { lazy, Suspense } from 'react'
import useNearScreeen from 'src/hooks/useNearScreen'
/* import TrendingSearches from './TrendingSearches' */

const TrendingSearches = lazy(() => import('./TrendingSearches'))

export default function LazyTrending() {
	const { isNearScreen, fromRef } = useNearScreeen()

	return (
		<div ref={fromRef}>
			<Suspense fallback={'Loading...'}>{isNearScreen ? <TrendingSearches /> : null}</Suspense>
		</div>
	)
}
