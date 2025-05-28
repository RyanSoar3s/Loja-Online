import {
  Component,
  afterRender,
  AfterContentChecked,
  Renderer2,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostBinding

} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { Product } from '@models/products.model';
import { ProductsService } from '@services/products.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ResponsiveService } from '@services/responsive.service';

@Component({
  selector: 'app-product-viewer',
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './product-viewer.component.html',
  styleUrl: './product-viewer.component.scss'
})
export class ProductViewerComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
  @HostBinding("style.--height-host-product-viewer") height_host_product_viewer!: string;
  @HostBinding("style.--flex-direction-product-viewer-product-viewer") flex_direction_product_viewer_product_viewer!: string;
  @HostBinding("style.--width-product-viewer__product-img-product-viewer") width_product_viewer__product_img_product_viewer!: string;
  @HostBinding("style.--width-product-viewer__tags-product-viewer") width_product_viewer__tags_product_viewer!: string;

  public product!: Product[keyof Product];
  protected indexImg: number = 0;
  protected selectedThumbPrev: number = 1;
  protected quantityProducts: number = 1;
  private selectedImage: boolean = false;
  private selectImage: ElementRef<HTMLElement> | null = null;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  private sub!: Subscription;

  protected faStar = faStar;

  constructor(
    private route: ActivatedRoute,
    private products: ProductsService,
    private el: ElementRef,
    private renderer: Renderer2,
    private responsive$: ResponsiveService

  ) {
    afterRender(() => {
      if (!this.selectedImage) this.selectImage = this.el.nativeElement.querySelector(`[data-img="img-${this.selectedThumbPrev}"]`);
      if (this.selectImage) { this.renderer.addClass(this.selectImage, "selected-thumbnail"); this.selectedImage = true; }

    });

  }
  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.height_host_product_viewer = "auto";
        this.width_product_viewer__product_img_product_viewer = "100%";
        this.flex_direction_product_viewer_product_viewer = "column";
        this.width_product_viewer__tags_product_viewer = "70vw";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.height_host_product_viewer = "auto";
        this.width_product_viewer__product_img_product_viewer = "80%";
        this.flex_direction_product_viewer_product_viewer = "column";
        this.width_product_viewer__tags_product_viewer = "60vw";

      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.height_host_product_viewer = "auto";
        this.width_product_viewer__product_img_product_viewer = "65%";
        this.flex_direction_product_viewer_product_viewer = "column";
        this.width_product_viewer__tags_product_viewer = "51vw";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.height_host_product_viewer = "auto";
        this.width_product_viewer__product_img_product_viewer = "60%";
        this.flex_direction_product_viewer_product_viewer = "column";
        this.width_product_viewer__tags_product_viewer = "51vw";

      }
      else {
        this.height_host_product_viewer = "115svh";
        this.width_product_viewer__product_img_product_viewer = "500px";
        this.flex_direction_product_viewer_product_viewer = "row";
        this.width_product_viewer__tags_product_viewer = "32vw";

      }

    })

  }

  ngAfterContentChecked(): void {
    if (!this.product) {
      const title = this.route.snapshot.queryParams["titulo"];
      this.product = this.products.filterProductByTitle<Product[keyof Product]>(title) as Product[keyof Product];

    }

  }

  ngAfterViewInit(): void {
    document.body.scrollTop = 0;

  }

  nextImage(index: number): void {
    this.indexImg = index;
    this.selectImage = this.el.nativeElement.querySelector(`[data-img="img-${index + 1}"]`);
    this.renderer.addClass(this.selectImage, "selected-thumbnail");

    const previousImage = this.el.nativeElement.querySelector(`[data-img="img-${this.selectedThumbPrev}"]`);
    this.renderer.removeClass(previousImage, "selected-thumbnail");
    this.selectedThumbPrev = index + 1;

  }

  increaseQuantityProducts(): void {
    if (this.quantityProducts < 99) this.quantityProducts++;

  }

  decreaseQuantityProducts(): void {
    if (this.quantityProducts > 1) this.quantityProducts--;

  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();

  }

}
