import { Module } from '@nestjs/common';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { DatabaseModule } from './nest-modules/database-module/database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
})
export class AppModule {}
