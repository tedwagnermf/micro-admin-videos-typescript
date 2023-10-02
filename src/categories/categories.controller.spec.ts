import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../nest-modules/database-module/database.module';
import { CategoriesController } from 'src/nest-modules/categories-module/categories.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { CategoriesModule } from 'src/nest-modules/categories-module/categories.module';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule]
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
