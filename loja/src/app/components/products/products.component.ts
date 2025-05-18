import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding

} from '@angular/core';
import { Product } from '@models/products.model';
import { ApiService } from '@services/api.service';
import { ResponsiveService } from '@services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule

  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  @HostBinding("style.--grid-template-columns-wrapper__products-products") grid_template_columns_wrapper__products_products!: string;
  @HostBinding("style.--font-size-products-wrapper__h1-products") font_size_products_wrapper__h1_products!: string;
  @HostBinding("style.--width-product-wrapper-products") width_product_wrapper_products!: string;
  @HostBinding("style.--height-product-wrapper__product-products") height_product_wrapper__product_products!: string;
  @HostBinding("style.--width-product-wrapper__product-products") width_product_wrapper__product_products!: string;

  private products!: Array<Product>;
  protected products_info!: Array<Product[keyof Product]>;
  private qtd_products_shown!: number;
  protected showedAllProducts: boolean = false;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  private sub!: Subscription;

  constructor(
    private api: ApiService,
    private responsive$: ResponsiveService

  ) {}

  ngOnInit(): void {
    this.api.requestApi().subscribe((data: Array<Product>) => {
      this.products = data
      this.showProducts(0);

    });

    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.qtd_products_shown = 6;
        this.width_product_wrapper_products = "400px";
        this.font_size_products_wrapper__h1_products = "1.9em";
        this.grid_template_columns_wrapper__products_products = "repeat(2, 1fr)";
        this.height_product_wrapper__product_products = "250px";
        this.width_product_wrapper__product_products = "160px";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.qtd_products_shown = 6;
        this.width_product_wrapper_products = "520px";
        this.font_size_products_wrapper__h1_products = "2em";
        this.grid_template_columns_wrapper__products_products = "repeat(2, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";

      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.qtd_products_shown = 6;
        this.width_product_wrapper_products = "580px";
        this.font_size_products_wrapper__h1_products = "2.3em";
        this.grid_template_columns_wrapper__products_products = "repeat(2, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.qtd_products_shown = 12;
        this.width_product_wrapper_products = "826px";
        this.font_size_products_wrapper__h1_products = "2.3em";
        this.grid_template_columns_wrapper__products_products = "repeat(3, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";

      }
      else {
        this.qtd_products_shown = 12;
        this.width_product_wrapper_products = "1000px";
        this.font_size_products_wrapper__h1_products = "2.3em";
        this.grid_template_columns_wrapper__products_products = "repeat(4, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";

      }
    })

  }

  private showProducts(increment: number): void {
    const obj_products: Array<Product[keyof Product]> = Object.values(this.products[0]);

    const len = obj_products.length;

    this.qtd_products_shown = Math.min(this.qtd_products_shown + increment, len);

    this.showedAllProducts = this.qtd_products_shown >= len;

    this.products_info = obj_products.slice(0, this.qtd_products_shown);

  }

  showNextProducts(): void {
    this.showProducts(4);

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();

    }

  }

}
