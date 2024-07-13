import { defineConfig, BetterSqliteDriver } from '@mikro-orm/better-sqlite';

export default defineConfig({
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'db.sqlite3',
  driver: BetterSqliteDriver,
});
