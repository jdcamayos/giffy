import { useEffect, useRef, useState } from 'react'

export default function useNearScreeen(
	{
		distance,
		once,
		externalRef,
	}: {
		distance?: string
		externalRef?: React.MutableRefObject<HTMLDivElement | null>
		once?: boolean
	} = {
		distance: '100px',
		once: true,
	}
) {
	const [isNearScreen, setIsNearScreen] = useState(false)
	const fromRef = useRef<HTMLDivElement | null>(null)

	const ref = externalRef ? externalRef : fromRef

	useEffect(() => {
		const onChange: IntersectionObserverCallback = (entries, observer) => {
			const el: IntersectionObserverEntry = entries[0]
			/* console.log(el.isIntersecting) */
			if (el.isIntersecting) {
				setIsNearScreen(true)
				once && observer.disconnect()
			} else {
				setIsNearScreen(false)
			}
		}

		const observer = new IntersectionObserver(onChange, {
			rootMargin: distance,
		})

		if (ref.current) observer.observe(ref.current)

		return () => observer.disconnect()
	})

	return { isNearScreen, fromRef }
}
