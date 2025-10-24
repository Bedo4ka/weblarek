import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Basket  {
  private events: IEvents;
  private items: IProduct[] = [];

  constructor(events: IEvents) {
    this.events = events;
  }

  addItem(product: IProduct): void {
    this.items.push(product);
    this.events.emit('basket:listChange', {
      items: this.items,
      totalPrice: this.getTotalPrice(),
      count: this.getItemCount()
    });
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
    this.events.emit('basket:listChange', {
      items: this.items,
      totalPrice: this.getTotalPrice(),
      count: this.getItemCount()
    });
  }

  clear(): void {
    this.items = [];
    this.events.emit('basket:listChange', {
      items: this.items,
      totalPrice: 0,
      count: 0
    });
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  getItemCount(): number {
    return this.items.length;
  }

  hasItem(productId: string): boolean {
    return this.items.some(p => p.id === productId);
  }

  getItems(): IProduct[] {
    return this.items;
  }
}