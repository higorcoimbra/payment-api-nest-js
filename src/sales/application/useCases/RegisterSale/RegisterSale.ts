import { Item } from '../../../domain/entity/Item';
import { Sale } from '../../../domain/entity/Sale';
import SaleRepository from '../../../infrastructure/repositories/SaleRepository';

export class RegisterSale {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(input: Input): Promise<Output> {
    const items = [];
    for (const item of input.items) {
      items.push(Item.create(item.productId, item.quantity, item.price));
    }
    const sale = Sale.create(input.salesmanId, input.date);
    sale.items = items;
    await this.saleRepository.saveSale(sale);
    return {
      saleId: sale.id,
    };
  }
}

type Input = {
  salesmanId: string;
  date: Date;
  items: any[];
};

type Output = {
  saleId: string;
};
