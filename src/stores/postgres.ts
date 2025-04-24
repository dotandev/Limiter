import postgres, {
    PostgresError,
  } from 'postgres';
  import { PersistenceStore } from '../types'; 
  
  const sql = postgres({
    host: process.env.PG_HOST || 'localhost',
    port: +(process.env.PG_PORT || 5432),
    database: process.env.PG_DATABASE || 'mydb',
    username: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    ssl: process.env.PG_SSL === 'true',
  });
  
  export class PostgresStore implements PersistenceStore {
    async get(key: string) {
      try {
        const result = await sql`
          SELECT value FROM store WHERE key = ${key}
        `;
        return result[0]?.value ?? null;
      } catch (err) {
        handlePostgresError(err);
        return null;
      }
    }
  
    async set(key: string, value: any) {
      try {
        await sql`
          INSERT INTO store (key, value)
          VALUES (${key}, ${value})
          ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
        `;
      } catch (err) {
        handlePostgresError(err);
      }
    }
  
    async delete(key: string) {
      try {
        await sql`
          DELETE FROM store WHERE key = ${key}
        `;
      } catch (err) {
        handlePostgresError(err);
      }
    }
  
    async has(key: string) {
      try {
        const result = await sql`
          SELECT 1 FROM store WHERE key = ${key} LIMIT 1
        `;
        return result.length > 0;
      } catch (err) {
        handlePostgresError(err);
        return false;
      }
    }
  };
  
  function handlePostgresError(err: any) {
    if (err instanceof PostgresError) {
      console.error('Postgres error:', err.message, err);
    } else {
      console.error('Unknown error:', err);
    }
  }
  

  