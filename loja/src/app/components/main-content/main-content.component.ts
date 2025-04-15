import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  Renderer2

} from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDollar,
  faTicket,
  faTruckFast,
  faGift,
  faShop

} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-content',
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements AfterViewInit {
  @ViewChild("carousel") carousel!: ElementRef;
  @ViewChildren("radio", { read: ElementRef }) radio!: Array<ElementRef>;

  protected faDollar = faDollar;
  protected faTicket = faTicket;
  protected faTruckFast = faTruckFast;
  protected faGift = faGift;
  protected faShop = faShop;

  private posX: number = 1;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.scroollCarousel();

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
