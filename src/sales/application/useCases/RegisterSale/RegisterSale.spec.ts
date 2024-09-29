import { SaleRepositoryInMemory } from '../../../domain/repositories/SaleRepository';
import { RegisterSale } from './RegisterSale';

it('should register a sale with salesman data and items sold', async () => {
  const input = {
    salesmanId: 'id1',
    date: new Date(),
    orderId: 'orderId1',
    itemIds: ['item1', 'item2'],
  };

  const saleRepository = new SaleRepositoryInMemory();
  const registerSale = new RegisterSale(saleRepository);
  const output = await registerSale.execute(input);
  expect(output.saleId).toBeDefined();
});
