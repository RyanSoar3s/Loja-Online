import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  AfterContentChecked

} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@models/products.model';
import { Subscription } from 'rxjs';
import { ResponsiveService } from '@services/responsive.service';
import {
  RouterLink,
  RouterModule

} from '@angular/router';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    RouterLink,
    RouterModule

  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterContentChecked, OnDestroy {
  @HostBinding("style.--grid-template-columns-wrapper__products-products") grid_template_columns_wrapper__products_products!: string;
  @HostBinding("style.--height-product-wrapper__product-products") height_product_wrapper__product_products!: string;
  @HostBinding("style.--width-product-wrapper__product-products") width_product_wrapper__product_products!: string;

  protected products_info!: Array<Product[keyof Product]>;
  private qtd_products_shown!: number;
  protected showedAllProducts: boolean = false;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  private sub!: Subscription;

  constructor(
    private productsService: ProductsService,
    private responsive$: ResponsiveService

  ) {}
  
  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.qtd_products_shown = 6;
        this.grid_template_columns_wrapper__products_products = "repeat(2, 1fr)";
        this.height_product_wrapper__product_products = "250px";
        this.width_product_wrapper__product_products = "160px";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.qtd_products_shown = 6;
        this.grid_template_columns_wrapper__products_products = "repeat(2, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";

      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.qtd_products_shown = 6;
        this.grid_template_columns_wrapper__products_products = "repeat(2, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.qtd_products_shown = 12;
        this.grid_template_columns_wrapper__products_products = "repeat(3, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";
        
      }
      else {
        this.qtd_products_shown = 12;
        this.grid_template_columns_wrapper__products_products = "repeat(4, 1fr)";
        this.height_product_wrapper__product_products = "300px";
        this.width_product_wrapper__product_products = "200px";
        
      }

    })
    
  }

  ngAfterContentChecked(): void {
    if (!this.products_info || this.products_info.length === 0) {
      this.showProducts(0);

    }
      
  }

  private showProducts(increment: number): void {
    const [ products, showedAllProducts ] = this.productsService.filterProductsByQuantity<Product[keyof Product]>(this.qtd_products_shown + increment);
    this.products_info = products;
    this.showedAllProducts = showedAllProducts;
    this.qtd_products_shown += increment;

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
