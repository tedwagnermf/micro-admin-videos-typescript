import * as Joi from 'joi';
import { CONFIG_DB_SCHEMA } from './config.module';

function expectValidate(schema: Joi.Schema, value: any) {
  return expect(schema.validate(value, { abortEarly: false }).error.message);
}

describe('Schema unit test', () => {
  describe('DB Schema', () => {
    const schema = Joi.object({
      ...CONFIG_DB_SCHEMA,
    });

    test('invalid cases', () => {
      expectValidate(schema, {}).toContain('"DB_VENDOR" is required');

      expectValidate(schema, { DB_VENDOR: 5}).toContain(
        '"DB_VENDOR" must be one of [mysql, sqlite]',
      );
    });

    test('valid cases', () => {
      const arrange = ['mysql', 'sqlite'];

      arrange.forEach((value) => {
        expectValidate(schema, { DB_VENDOR: value }).not.toContain('DB_VENDOR');
      });
    });
  });

  // fazer os outros testes
});
