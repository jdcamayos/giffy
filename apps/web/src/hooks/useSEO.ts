import { useEffect, useRef } from 'react'

export default function useSEO({ title, description }: { title: string; description?: string }) {
	const prevTitle = useRef(document.title)
	const prevDescription = useRef(document.querySelector('meta[name="description"]'))

	useEffect(() => {
		const previousTitle = prevTitle.current
		document.title = title ? `${title} | Giffy` : 'Giffy'

		return () => {
			document.title = previousTitle
		}
	}, [title])

	useEffect(() => {
		const previousDescription = prevDescription.current?.textContent
		if (description) {
			const metaDescription = document.querySelector('meta[name="description"')
			metaDescription?.setAttribute('content', description)

			return () => {
				if (typeof previousDescription === 'string') {
					metaDescription?.setAttribute('content', previousDescription)
				}
			}
		}
	}, [description])
}
