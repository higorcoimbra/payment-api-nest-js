import { Column, ManyToOne } from 'typeorm';
import { Sale } from '../../../domain/entity/Sale';

export class Item {
  @Column()
  id: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;
}
