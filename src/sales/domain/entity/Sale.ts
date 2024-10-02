import { Item } from './Item';

export class Sale {
  items: Item[];

  constructor(
    readonly id: string,
    readonly salesmanId: string,
    readonly date: Date,
  ) {}

  static create(salesmanId: string, date: Date): Sale {
    const id = crypto.randomUUID();
    return new Sale(id, salesmanId, date);
  }
}
