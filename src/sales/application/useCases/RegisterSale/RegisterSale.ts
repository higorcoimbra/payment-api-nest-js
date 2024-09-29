import { Item } from '../../../domain/entities/Item';
import { Sale } from '../../../domain/entities/Sale';
import SaleRepository from '../../../domain/repositories/SaleRepository';

export class RegisterSale {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(input: Input): Promise<Output> {
    const items = [];
    for (const itemId of input.itemIds) {
      items.push(new Item(itemId));
    }
    const sale = Sale.create(input.salesmanId, input.date, input.orderId);
    sale.setItems(items);
    await this.saleRepository.save(sale);
    return {
      saleId: sale.id,
    };
  }
}

type Input = {
  salesmanId: string;
  date: Date;
  orderId: string;
  itemIds: string[];
};

type Output = {
  saleId: string;
};
