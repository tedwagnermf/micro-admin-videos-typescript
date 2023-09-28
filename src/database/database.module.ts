import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';

const models = [CategoryModel];

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const dbVendor = configService.get("DB_VENDOR");
        if (configService.get("DB_VENDOR") === 'sqlite') {
          return {
            dialect: 'sqlite',
            host: configService.get("DB_HOST"),
            models,
            logging: configService.get("DB_LOGGING"),
            autoLoadModels: configService.get("DB_AUTO_LOAD_MODELS"),
          };
        }

        if (configService.get("DB_VENDOR") === 'mysql') {
          return {
            dialect: 'mysql',
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USERNAME"),
            password: configService.get("DB_PASSWORD"),
            models,
            logging: configService.get("DB_LOGGING"),
            autoLoadModels: configService.get("DB_AUTO_LOAD_MODELS"),
          };
        }

        throw new Error(`unsupported database vendor: ${dbVendor}`);
      },
      inject: [ConfigService],
    }),
  ],
})

export class DatabaseModule { }
