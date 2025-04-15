import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ViewChildren,
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
  faShop

} from '@fortawesome/free-solid-svg-icons';

import { ResponsiveService } from '../../services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("style.--width-ul-container-categories-promos-main") width_ul_container_categories_promos_style!: string;
  @ViewChild("carousel") carousel!: ElementRef;
  @ViewChildren("radio", { read: ElementRef }) radio!: Array<ElementRef>;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  protected faDollar = faDollar;
  protected faTicket = faTicket;
  protected faTruckFast = faTruckFast;
  protected faGift = faGift;
  protected faShop = faShop;

  private posX: number = 1;
  private sub!: Subscription

  constructor(
    private renderer: Renderer2,
    private responsive$: ResponsiveService

  ) {}
  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.width_ul_container_categories_promos_style = "265px";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.width_ul_container_categories_promos_style = "410px";


      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.width_ul_container_categories_promos_style = "410px";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.width_ul_container_categories_promos_style = "680px";

      }
      else {
        this.width_ul_container_categories_promos_style = "680px";

      }



    })

  }

  ngAfterViewInit(): void {
    this.scroollCarousel();

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();

    }

  }

  scroollCarousel(): void {
    const carousel = this.carousel.nativeElement;

    setInterval(() => {
      if (this.posX > 2) this.posX = 0;

      this.radio.forEach((radio: ElementRef, index: number) => {
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
    this.posX = Number(index);

    const carousel = this.carousel.nativeElement;
    this.renderer.setStyle(carousel, 'transform', `translateX(calc(${this.posX++} * (-33.34%)))`);


  }

}
