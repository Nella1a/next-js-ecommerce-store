import camelcaseKeys from 'camelcase-keys';
// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres (= client library which connects to DBMS)
import postgres from 'postgres';
import { PlantsAndQuantity, PlantsTwo } from '../pages/types.js';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();
config();

// Type needed for the connection function below

function connectOneTimeToDatabase() {
  let sql;

  // production:
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  }
  // local environment:
  else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to PostgresSQl
const sql = connectOneTimeToDatabase();

export async function readPlants() {
  const plants: {id: number, price: number, name: string, description: string}[] = await sql`
  SELECT * FROM plants;
  `;
  return plants.map((plant) => camelcaseKeys(plant));
}

/* Select record in plants based on ID, returns = single value or undefined */
export async function getPlantById(id: number):Promise<{id: number, price: number, name: string, description: string}[]> {
  const [plant] = await sql`
    SELECT * FROM plants WHERE id = ${id};
  `;
  return camelcaseKeys(plant);
}


/* Select record in plants based on IDs, returns =  list of ids*/
export async function getPlantsById(id: number[]):Promise<PlantsTwo[]> {
  const plantsIds:PlantsTwo[] = [];

  for (let i=0; i <= id.length - 1; i++){
  const result: PlantsTwo[] =  await sql`
    SELECT * FROM plants WHERE id = ${id[i]};
  `;
  console.log("result_DB_XXX: ", result)

  plantsIds.push(...result);
  console.log("plantsIds_DB: ", plantsIds)

  }
   return plantsIds.map((plant) => camelcaseKeys(plant));
}
