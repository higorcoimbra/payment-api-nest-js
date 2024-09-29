import { Sale } from '../entities/Sale';

export default interface SaleRepository {
  save(sale: Sale): Promise<void>;
}

export class SaleRepositoryInMemory implements SaleRepository {
  sales: Sale[];

  constructor() {
    this.sales = [];
  }

  async save(sale: Sale): Promise<void> {
    this.sales.push(sale);
  }
}
