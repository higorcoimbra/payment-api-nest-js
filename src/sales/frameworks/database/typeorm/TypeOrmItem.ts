import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Sale } from './TypeOrmSale';

@Entity()
export class Item {
  @PrimaryColumn()
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
