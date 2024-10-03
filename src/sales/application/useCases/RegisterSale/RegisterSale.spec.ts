import { Test, TestingModule } from '@nestjs/testing';
import {
  SaleRepositoryInMemory,
  TypeOrmSaleRepository,
} from '../../../infrastructure/repositories/SaleRepository';
import GetSale from '../GetSale/GetSale';
import { RegisterSale } from './RegisterSale';
import { TypeORMMySqlTestingModule } from '../../../../../test/test-utils/TypeORMMysqlTestingModule';
import { Sale as TypeOrmSale } from '../../../frameworks/database/typeorm/TypeOrmSale';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item as TypeOrmItem } from '../../../frameworks/database/typeorm/TypeOrmItem';
import { INestApplication } from '@nestjs/common';

let typeOrmSaleRepository: TypeOrmSaleRepository;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeORMMySqlTestingModule([TypeOrmSale, TypeOrmItem]),
      TypeOrmModule.forFeature([TypeOrmSale, TypeOrmItem]),
    ],
    providers: [TypeOrmSaleRepository],
  }).compile();

  typeOrmSaleRepository = module.get<TypeOrmSaleRepository>(
    TypeOrmSaleRepository,
  );
});

it('should register a sale with salesman data and items sold', async () => {
  const input = {
    salesmanId: 'id1',
    date: new Date('2024-01-10'),
    items: [
      {
        productId: '1',
        quantity: 1,
        price: 99.9,
      },
      {
        productId: '2',
        quantity: 1,
        price: 19.9,
      },
    ],
  };

  // const saleRepository = new SaleRepositoryInMemory();
  const saleRepository = typeOrmSaleRepository;
  const registerSale = new RegisterSale(saleRepository);
  const output = await registerSale.execute(input);
  expect(output.saleId).toBeDefined();
  const getSale = new GetSale(saleRepository);
  const outputGetSale = await getSale.execute(output.saleId);
  expect(outputGetSale.date.getTime()).toBe(new Date('2024-01-10').getTime());
  expect(outputGetSale.items.length).toBe(2);
  expect(outputGetSale.salesmanId).toBe('id1');
});
