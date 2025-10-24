import { events } from '../../main';
import { IProduct } from '../../types';

export class Products {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(products: IProduct[] = []) {
    if (products.length) this.setProducts(products);
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    events.emit('products:change', products);
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(p => p.id === id);
  }

  setSelectedProduct(product: IProduct | null): void {
    this.selectedProduct = product;
    events.emit('product:selected:set', product ?? undefined);
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  clearSelectedProduct():void {
    this.selectedProduct = null
  }
}