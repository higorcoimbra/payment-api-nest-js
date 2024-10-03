import SaleRepository from '../../../infrastructure/repositories/SaleRepository';

export default class GetSale {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(id: string): Promise<Output> {
    const sale = await this.saleRepository.findSaleById(id);
    const outputItems = [];
    for (const item of sale.items) {
      outputItems.push({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }
    return {
      id: sale.id,
      salesmanId: sale.salesmanId,
      date: sale.date,
      items: outputItems,
    };
  }
}

type Output = {
  id: string;
  salesmanId: string;
  date: Date;
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};
