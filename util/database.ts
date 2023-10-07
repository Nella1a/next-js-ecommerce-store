import camelcaseKeys from 'camelcase-keys';
// 1. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 2. Import postgres (= client library which connects to DBMS)
import postgres from 'postgres';
import { Plant, PlantsTwo } from '../pages/types.js';

type Global = typeof globalThis & {
  postgresSqlClient?: any;
};

config();

// Type needed for the connection function below

function connectOneTimeToDatabase() {
  let sql;

  // local environment:
  const globalWithSqlClient: Global = globalThis;
  if (!globalWithSqlClient.postgresSqlClient) {
    globalWithSqlClient.postgresSqlClient = postgres();
  }
  sql = globalWithSqlClient.postgresSqlClient;

  return sql;
}

// Connect to PostgresSQl
const sql = connectOneTimeToDatabase();

export async function readPlants() {
  const plants: Plant[] = await sql`
  SELECT * FROM plants;
  `;
  return plants.map((plant) => camelcaseKeys(plant));
}

/* Select record in plants based on ID, returns = single value or undefined */
export async function getPlantById(
  id: number,
): Promise<{ id: number; price: number; name: string; description: string }> {
  const [plant] = await sql`
    SELECT * FROM plants WHERE id = ${id};
  `;
  return camelcaseKeys(plant);
}

/* Select record in plants based on Name */
export async function getPlantByName(
  name: string,
): Promise<{ id: number; price: number; name: string; description: string }> {
  const [plant] = await sql`
    SELECT * FROM plants WHERE Lower(name) = Lower(${name});
  `;
  return camelcaseKeys(plant);
}

/* Select record in plants based on IDs, returns =  list of ids*/
export async function getPlantsById(id: number[]): Promise<PlantsTwo[]> {
  const plantsIds: PlantsTwo[] = [];

  for (let i = 0; i <= id.length - 1; i++) {
    const result: PlantsTwo[] = await sql`
    SELECT * FROM plants WHERE id = ${id[i]};
  `;

    plantsIds.push(...result);
    console.log('plantsIds_DB: ', plantsIds);
  }
  return plantsIds.map((plant) => camelcaseKeys(plant));
}
