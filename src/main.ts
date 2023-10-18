import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NotFoundFilter } from './nest-modules/shared-module/not-found/not-found.filter';
import { EntityValidationErrorFilter } from './nest-modules/shared-module/not-found/entity-validation-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new NotFoundFilter(), new EntityValidationErrorFilter());

  await app.listen(3000);
}
bootstrap();
