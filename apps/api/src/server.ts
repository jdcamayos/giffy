import app from './app'
import { config } from 'dotenv'
config()

function main() {
	const port = process.env.PORT || 4000
	app.listen(port)
	console.log('Server running...')
}

main()
