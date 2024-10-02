import { SaleRepositoryInMemory } from '../../../infrastructure/repositories/SaleRepository';
import GetSale from '../GetSale/GetSale';
import { RegisterSale } from './RegisterSale';

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

  const saleRepository = new SaleRepositoryInMemory();
  const registerSale = new RegisterSale(saleRepository);
  const output = await registerSale.execute(input);
  expect(output.saleId).toBeDefined();
  const getSale = new GetSale(saleRepository);
  const outputGetSale = await getSale.execute(output.saleId);
  expect(outputGetSale.date.getTime()).toBe(new Date('2024-01-10').getTime());
  expect(outputGetSale.items.length).toBe(2);
  expect(outputGetSale.salesmanId).toBe('id1');
});
