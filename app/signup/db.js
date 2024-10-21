import { Pool } from 'pg';

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
});

export const db = {
  query: (text, params) => pool.query(text, params),
};
