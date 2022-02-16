import camelcaseKeys from 'camelcase-keys';
// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres (= client library which connects to DBMS)
import postgres from 'postgres';

config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  // When in development, connect only once to the database
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;
  return sql;
}

const sql = connectOneTimeToDatabase();

export async function readPlants() {
  const plants = await sql`
  SELECT * FROM plants;
  `;
  return plants.map((plant) => camelcaseKeys(plant));
}

/* Select record in plants based on ID, returns = single value or undefined */
export async function getPlantById(id) {
  const [plant] = await sql`
    SELECT * FROM plants WHERE id = ${id};
  `;
  return camelcaseKeys(plant);
}
