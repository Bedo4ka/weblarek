export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card' | 'cash' | '';
export type TProductsResponse = IApiResponse<IProduct>;

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IApiResponse<T> {
  total: number;
  items: T[];
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
} 

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface productsApi {
  total: number;
  items: IProduct[];
}

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderRequest {
  buyer: IBuyer;
  items: IProduct[];
}

export interface Order extends IBuyer {
  items: string; 
  total:number;
}

export interface IValidationErrors {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IHeaderData {
  counter: number
}

export interface IGalleryData {
  galleryList: HTMLElement[]
}

export interface IModalData {
  content: HTMLElement
}

export interface ISuccessData {
  totalPrice: number
}

export interface IFormErrorData {
  error: string
}

export interface IBasketViewData {
  basketList: HTMLUListElement
  totalPrice: number
  emptyMessage: HTMLElement
}

export type TOrder = {
  payment: TPayment,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[],
}

export type TOrderResponse = {
  id: string;
  total: number;
}