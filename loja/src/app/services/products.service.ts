import { Injectable } from '@angular/core';
import { Product } from '@models/products.model';
import {
  signal,
  computed

} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products = signal<Array<Product>>([]);
  public computedProducts = computed(() => this.products());

  setProducts(products: Array<Product>) {
    this.products.update(() => products);

  }

  filterProductByTitle<K extends Product[keyof Product]>(title: string): K | undefined {
    let searchedProduct: K | undefined = undefined;
    this.products().forEach((product: Product) => {
      searchedProduct = Object.values(product).find((info: Product[keyof typeof product]) => (info.title === title) ? info : undefined) as K;
      if (searchedProduct) return;

    });

    return searchedProduct as any as K;

  }

  filterProductsByQuantity<K extends Product[keyof Product]>(quantity: number): [ Array<K>, boolean ] {
    if (this.products().length === 0) return [ [], true ];
    const products = Object.values(this.products()[0]);
    const qtdProductsShown = Math.min(quantity, products.length);
    const filteredProducts = products.slice(0, qtdProductsShown);
    return [ filteredProducts as Array<K>, qtdProductsShown >= products.length ];

  }

}
