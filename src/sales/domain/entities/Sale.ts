import { Item } from './Item';

export class Sale {
  items: Item[];

  constructor(
    readonly id: string,
    readonly salesmanId: string,
    readonly date: Date,
    readonly orderId: string,
  ) {}

  setItems(items: Item[]) {
    this.items = [...items];
  }

  static create(salesmanId: string, date: Date, orderId: string): Sale {
    const id = crypto.randomUUID();
    return new Sale(id, salesmanId, date, orderId);
  }
}
