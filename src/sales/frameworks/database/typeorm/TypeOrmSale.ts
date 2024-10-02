import { Column, OneToMany } from 'typeorm';
import { Item } from './TypeOrmItem';

export class Sale {
  @Column()
  id: string;

  @Column('datetime')
  date: Date;

  @OneToMany(() => Item, (item) => item.sale)
  items: Item[];
}
