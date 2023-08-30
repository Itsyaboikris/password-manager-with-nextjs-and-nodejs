import mongoose from "mongoose"
import { DB_CONNECTION_STRING } from "../constants"
import logger from "./logger"

export async function connectToDB() {
	try {
		await mongoose.connect(DB_CONNECTION_STRING)
	} catch(e){
		logger.error(e,"error connecting to database")
		process.exit(1)
	}
}

export async function disconnectFromDB() {
	await mongoose.connection.close()

	logger.info("Disconnected from db")

	return;
}