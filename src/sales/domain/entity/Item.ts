export class Item {
  constructor(
    readonly id: string,
    readonly productId: string,
    readonly quantity: number,
    readonly price: number,
  ) {}

  static create(productId: string, quantity: number, price: number) {
    const id = crypto.randomUUID();
    return new Item(id, productId, quantity, price);
  }
}
