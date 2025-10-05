export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
} 

export interface IBuyer {
  payment: TPayment|null;
  email: string;
  phone: string;
  address: string;
}

export interface IProductResponse {
  items: IProduct[];
}

export interface IOrderRequest {
  buyer: IBuyer;
  items: IProduct[];
}