import Pool from "pg";
import dotenv from "dotenv";
dotenv.config();

// Vercel postgre database
export const dbConnection = new Pool.Pool({
  connectionString: "postgres://default:qtMnJlu30pyj@ep-misty-mud-22966391-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})  