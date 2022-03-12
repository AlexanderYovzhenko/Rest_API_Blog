import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'ec2-34-247-151-118.eu-west-1.compute.amazonaws.com',
  url: 'postgres://rwsgndpgmlpckv:10a0795ba77b58ef34755956aa379fb33bb441f2e6db36f2e63c637c7c3c6dec@ec2-34-247-151-118.eu-west-1.compute.amazonaws.com:5432/d3hcg5j8b3hhmf',
  port: 5432,
  username: 'rwsgndpgmlpckv',
  password: '10a0795ba77b58ef34755956aa379fb33bb441f2e6db36f2e63c637c7c3c6dec',
  database: 'd3hcg5j8b3hhmf',
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
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
