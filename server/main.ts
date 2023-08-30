import createServer from "./src/utils/createServer"
import { disconnectFromDB } from "./src/utils/db"
import logger from "./src/utils/logger"
import {FastifyInstance}  from 'fastify'



function gracefulShutdown(signal:string, app:FastifyInstance) {
	process.on(signal, async () => {
		logger.info(`Goodbye, got signal ${signal}`)

		app.close()
		await disconnectFromDB()

		logger.info("My work here is done")

		process.exit(0)
	})
}

async function main() {
	const app = createServer()

	try {
		const url = await app.listen({
			port: 4000,
			host: '127.0.0.1'
		})

		logger.info(`server is ready at ${url}`)
	} catch (e) {
		logger.error(e)
		process.exit(1)
	}

	const signals = ["SIGTERM", "SIGINT"]

	for (let i = 0; i < signals.length; i++) {
		gracefulShutdown(signals[i], app)
	}

}

main()