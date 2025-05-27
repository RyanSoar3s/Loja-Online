import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding

} from '@angular/core';
import { ProductsComponent } from '@components/products/products.component';
import { ResponsiveService } from '@services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-area',
  imports: [
    CommonModule,
    ProductsComponent

  ],
  templateUrl: './product-area.component.html',
  styleUrl: './product-area.component.scss'
})
export class ProductAreaComponent implements OnInit, OnDestroy {
  @HostBinding("style.--font-size-products-wrapper__h1-product-area") font_size_products_wrapper__h1_product_area!: string;
  @HostBinding("style.--width-product-wrapper-product-area") width_product_wrapper_product_area!: string;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  private sub!: Subscription;

  constructor(
    private responsive$: ResponsiveService

  ) {}

  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.width_product_wrapper_product_area = "390px";
        this.font_size_products_wrapper__h1_product_area = "1.9em";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.width_product_wrapper_product_area = "520px";
        this.font_size_products_wrapper__h1_product_area = "2em";

      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.width_product_wrapper_product_area = "580px";
        this.font_size_products_wrapper__h1_product_area = "2.3em";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.width_product_wrapper_product_area = "826px";
        this.font_size_products_wrapper__h1_product_area = "2.3em";

      }
      else {
        this.width_product_wrapper_product_area = "1000px";
        this.font_size_products_wrapper__h1_product_area = "2.3em";

      }
    })

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();

    }

  }

}
