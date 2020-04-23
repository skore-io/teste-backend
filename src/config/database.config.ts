import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const databaseHost: string = process.env.DB_HOST;
const databasePort: number = parseInt(process.env.DB_PORT);
const databaseName: string = process.env.DB_NAME;
const databaseUsername: string = process.env.DB_USER;
const databasePassword: string = process.env.DB_PASSWORD;
const databaseSync: boolean = process.env.DB_SYNC === 'TRUE';
const databaseLogging: boolean = process.env.DB_LOGGING === 'TRUE';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: databaseName,
  host: databaseHost,
  port: databasePort,
  username: databaseUsername,
  password: databasePassword,
  entities: [__dirname + '../../**/*.entity.js'],
  synchronize: databaseSync,
  namingStrategy: new SnakeNamingStrategy(),
  logger: 'advanced-console',
  logging: databaseLogging,
};
