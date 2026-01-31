type LogLevel = "INFO" | "WARN" | "ERROR";

function log(level: LogLevel, message: string, meta?: object) {
	const logEntry = {
		timestamp: new Date().toISOString(),
		level,
		message,
		...(meta && { meta }),
	};

	// JSON = machine-friendly + future-proof
	console.log(JSON.stringify(logEntry));
}

export const logger = {
	info: (message: string, meta?: object) => log("INFO", message, meta),

	warn: (message: string, meta?: object) => log("WARN", message, meta),

	error: (message: string, meta?: object) => log("ERROR", message, meta),
};
