import { useEffect, useRef, useState } from "react"

export default function useNearScreeen({ distance }: { distance?: string } = { distance: '100px' }) {
	const [isNearScreen, setIsNearScreen] = useState(false)
	const fromRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const onChange: IntersectionObserverCallback = (entries, observer) => {
			const el: IntersectionObserverEntry = entries[0]
			console.log(el.isIntersecting)
			if (el.isIntersecting) {
				setIsNearScreen(true)
				observer.disconnect()
			}
		}

		const observer = new IntersectionObserver(onChange, {
			rootMargin: distance,
		})

		if (fromRef.current) observer.observe(fromRef.current)

		return () => observer.disconnect()
	})

	return { isNearScreen, fromRef }
}