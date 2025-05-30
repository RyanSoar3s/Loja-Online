import { CommonModule } from '@angular/common';
import {
  Component,
  viewChild,
  viewChildren,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  HostBinding

} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDollar,
  faTicket,
  faTruckFast,
  faGift,
  faCartShopping

} from '@fortawesome/free-solid-svg-icons';

import { ResponsiveService } from '@services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promotion',
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit, OnDestroy {
  @HostBinding("style.--align-items-container-categories-promos-main") align_items_container_categories_promos_style!: string;

  private carousel = viewChild<ElementRef<HTMLElement>>("carousel");
  private radio = viewChildren<string, ElementRef<HTMLElement> >("radio", { read: ElementRef });

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  protected faDollar = faDollar;
  protected faTicket = faTicket;
  protected faTruckFast = faTruckFast;
  protected faGift = faGift;
  protected faCartShopping = faCartShopping;

  private posX: number = 1;
  private sub!: Subscription

  constructor(
    private renderer: Renderer2,
    private responsive$: ResponsiveService

  ) {}
  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.align_items_container_categories_promos_style = "flex-start";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.align_items_container_categories_promos_style = "flex-start";


      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.align_items_container_categories_promos_style = "center";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.align_items_container_categories_promos_style = "center";

      }
      else {
        this.align_items_container_categories_promos_style = "center";

      }

    });
   this.scroollCarousel();
  }

  scroollCarousel(): void {
    const carousel = this.carousel()?.nativeElement as HTMLElement;

    setInterval(() => {
      if (this.posX > 2) this.posX = 0;

      this.radio().forEach((radio: ElementRef<HTMLElement>, index: number) => {
        if (index === this.posX) {
          this.renderer.setProperty(radio.nativeElement, 'checked', true);

        }
        else {
          this.renderer.setProperty(radio.nativeElement, 'checked', false);

        }

      });

      this.renderer.setStyle(carousel, 'scroll-behavior', 'smooth');
      this.renderer.setStyle(carousel, 'transition', 'transform 0.6s ease-in-out');
      this.renderer.setStyle(carousel, 'transform', `translateX(calc(${this.posX++} * (-33.34%)))`);

    }, 3000);

  }

  changeCarousel(index: number): void {
    this.posX = index;
    console.log(this.posX)

    const carousel = this.carousel()?.nativeElement as HTMLElement;

    this.renderer.setStyle(carousel, 'transform', `translateX(calc(${this.posX++} * (-33.34%)))`);

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();

    }

  }

}
