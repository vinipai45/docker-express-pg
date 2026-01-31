import express from "express";
import pkg from "pg";
import { logger } from "./utils/logger";
import { requestLogger } from "./middleware/requestLogger";

const { Pool } = pkg;
const app = express();
app.use(express.json());

logger.info("APP_START", {
	env: process.env.NODE_ENV,
	port: 3000,
});

// IMPORTANT: service name = postgres
const pool = new Pool({
	host: "postgres",
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	port: 5432,
});

app.use(requestLogger);

app.get("/", async (req, res) => {
	const result = await pool.query("SELECT NOW()");
	res.json({ time: result.rows[0], health: "healthy OK!!" });
});

app.get("/users", async (req, res) => {
	const result = await pool.query("SELECT * FROM users");
	res.json({ users: result.rows });
});

app.listen(3000, () => {
	console.log("Express running on port 3000");
});
