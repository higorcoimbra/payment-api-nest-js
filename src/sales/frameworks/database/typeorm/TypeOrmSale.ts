import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Item } from './TypeOrmItem';

@Entity()
export class Sale {
  @PrimaryColumn()
  id: string;

  @Column('datetime')
  date: Date;

  @OneToMany(() => Item, (item) => item.sale, {
    cascade: true,
  })
  items: Item[];
}
