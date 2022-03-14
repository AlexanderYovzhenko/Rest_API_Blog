import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  dropSchema: true,
  logging: true,
  synchronize: false,
  migrationsRun: true,
  entities: ['src/**/models/*{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;

