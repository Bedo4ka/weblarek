import { IEvents } from '../base/Events';
import { IBuyer, IValidationErrors, TPayment } from '../../types';

export class Buyer {
  private payment: TPayment;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  constructor(private events: IEvents){
    this.payment = '';
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('buyer:change', { field: 'payment' });
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit('buyer:change', { field: 'email' });
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('buyer:change', { field: 'phone' });
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit('buyer:change', { field: 'address' });
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    };
  }

  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events.emit('buyer:change', { field: 'all' });
  }

  validate(): IValidationErrors {
    const errors: IValidationErrors = {}
    if (!this.payment) { errors.payment = 'Укажите способ оплаты' }
    if (!this.address) { errors.address = 'Укажите адрес' }
    if (!this.phone) { errors.phone = 'Укажите телефон' }
    if (!this.email) { errors.email = 'Укажите email' }
    return errors
  }
}