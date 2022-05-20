import { Navigate, useParams } from 'react-router-dom'
import useSingleGif from 'src/hooks/useSingleGif'
import { Helmet } from 'react-helmet'
import Gif from '../../components/Gif'
import Spinner from 'src/components/Spinner'

export default function Details() {
	const { id } = useParams()
	const { gif, isLoading, isError } = useSingleGif({ id })
	const title = gif ? gif.title : ''
	/* useSEO({ title, description: `Detail of ${title}` }) */

	if (isLoading)
		return (
			<>
				<Helmet>
					<title>Cargando...</title>
				</Helmet>
				<Spinner />
			</>
		)
	if (isError) return <Navigate to='/404' />

	if (!gif) return null

	return (
		<>
			<Helmet>
				<title>{title} | Giffy</title>
			</Helmet>
			<div>
				<h3>Gif {gif?.title}</h3>
				{gif && <Gif {...gif} />}
			</div>
		</>
	)
}
