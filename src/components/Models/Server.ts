import { IApi, TOrder, TOrderResponse } from '../../types';
import { IProduct } from '../../types';

export class Server {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

 async fetchProducts(): Promise<IProduct[]> {
  const response = await this.api.get<IProduct[] | { items: IProduct[] }>('/product/');
  return Array.isArray(response) ? response : response.items;
}

  async sendOrder(order: TOrder): Promise<TOrderResponse> {
    return await this.api.post('/order/', order);
  }
}