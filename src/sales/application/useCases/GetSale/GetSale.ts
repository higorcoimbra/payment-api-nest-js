import { Sale } from '../../../domain/entity/Sale';
import SaleRepository from '../../../infrastructure/repositories/SaleRepository';

export default class GetSale {
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(id: string): Promise<Sale> {
    const sale = this.saleRepository.findSaleById(id);
    return sale;
  }
}
