import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../../domain/entity/Sale';
import { Sale as TypeOrmSale } from '../../frameworks/database/typeorm/TypeOrmSale';
import { Item as TypeOrmItem } from '../../frameworks/database/typeorm/TypeOrmItem';
import { Repository } from 'typeorm';
import { Item } from '../../domain/entity/Item';

export default interface SaleRepository {
  saveSale(sale: Sale): Promise<void>;
  findSaleById(id: string): Promise<Sale>;
}

export class TypeOrmSaleRepository implements SaleRepository {
  constructor(
    @InjectRepository(TypeOrmSale)
    private saleRepository: Repository<TypeOrmSale>,
  ) {}

  async saveSale(sale: Sale): Promise<void> {
    const typeOrmSale = this.toTypeOrmSale(sale);
    await this.saleRepository.save(typeOrmSale);
  }

  async findSaleById(id: string): Promise<Sale> {
    const typeOrmSale = await this.saleRepository.findOneBy({ id });
    if (!typeOrmSale) throw new Error('Sale not found');
    return this.toSale(typeOrmSale);
  }

  toSale(typeOrmSale: TypeOrmSale): Sale {
    const sale = new Sale(typeOrmSale.id, 'id1', typeOrmSale.date);
    sale.items = [];
    for (const typeOrmItem of typeOrmSale.items) {
      const item = this.toItem(typeOrmItem);
      sale.items.push(item);
    }
    return sale;
  }

  toItem(typeOrmItem: TypeOrmItem): Item {
    const item = new Item(
      typeOrmItem.id,
      typeOrmItem.productId,
      typeOrmItem.quantity,
      typeOrmItem.price,
    );
    return item;
  }

  toTypeOrmSale(sale: Sale): TypeOrmSale {
    const typeOrmSale = new TypeOrmSale();
    typeOrmSale.id = sale.id;
    typeOrmSale.date = sale.date;
    typeOrmSale.items = [];
    for (const item of sale.items) {
      const typeOrmItem = this.toTypeOrmItem(item);
      typeOrmSale.items.push(typeOrmItem);
    }
    return typeOrmSale;
  }

  toTypeOrmItem(item: Item): TypeOrmItem {
    const typeOrmItem = new TypeOrmItem();
    typeOrmItem.id = item.id;
    typeOrmItem.price = item.price;
    typeOrmItem.productId = item.productId;
    typeOrmItem.quantity = item.quantity;
    return typeOrmItem;
  }
}

export class SaleRepositoryInMemory implements SaleRepository {
  sales: Sale[];

  constructor() {
    this.sales = [];
  }

  async saveSale(sale: Sale): Promise<void> {
    this.sales.push(sale);
  }

  async findSaleById(id: string): Promise<Sale> {
    const sale = this.sales.find((sale) => sale.id === id);
    if (!sale) throw new Error('Sale does not exist');
    return sale;
  }
}
