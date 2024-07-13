import { defineConfig, MongoDriver } from '@mikro-orm/mongodb';

export default defineConfig({
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: process.env.NODE_ENV,
  clientUrl: process.env.MONGODB_URI,
  driver: MongoDriver,
});
