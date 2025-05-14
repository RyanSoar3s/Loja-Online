import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy

} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
 faCircleArrowLeft,
 faCircleArrowRight

} from '@fortawesome/free-solid-svg-icons'
import { ResponsiveService } from '@services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @HostBinding("style.--transtale-x") translate_x!: string;
  @HostBinding("style.--width-categories-categories") width_categories_categories!: string;
  @HostBinding("style.--width-categories__items-categories") width_categories_items_categories!: string;
  @HostBinding("style.--padding-left-categories__items-categories") padding_left_categories_items_categories!: string;
  @HostBinding("style.--width-categories__item-categories") width_categories_item_categories!: string;
  @HostBinding("style.--height-categories__img-categories") height_categories__img_categories!: string;
  @HostBinding("style.--width-categories__img-categories") width_categories__img_categories!: string;
  @HostBinding("style.--width-categories__arrows-categories") width_categories__arrows_categories!: string;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  protected readonly titles: Array<string> = [
    "Roupas Masculinas",
    "Roupas Femininas",
    "Computadores",
    "Relógios",
    "Smartphones",
    "Consoles"

  ];

  protected readonly faCircleArrowLeft =  faCircleArrowLeft;
  protected readonly faCircleArrowRight =  faCircleArrowRight;

  private translate_direction: number = 0;
  private factor_direction: number = 0;
  private translate_perc_value!: number;
  private amount_of_items_on_screen!: number;

  private sub!: Subscription;

  constructor(
    private responsive$: ResponsiveService

  ) {}

  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      if (state.breakpoints[this.XSMALL]) {
        this.translate_x = "0px";
        this.factor_direction = 0;
        this.amount_of_items_on_screen = 1;
        this.translate_perc_value = -215;
        this.width_categories_categories = "100%";
        this.width_categories_items_categories = "168px";
        this.padding_left_categories_items_categories = "0px";
        this.width_categories_item_categories = "163px";
        this.height_categories__img_categories = "200px";
        this.width_categories__img_categories = "141px";
        this.width_categories__arrows_categories = "360px";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.translate_x = "0px";
        this.factor_direction = 0;
        this.amount_of_items_on_screen = 2;
        this.translate_perc_value = -428;
        this.width_categories_categories = "100%";
        this.width_categories_items_categories = "377px";
        this.padding_left_categories_items_categories = "0px";
        this.width_categories_item_categories = "163px";
        this.height_categories__img_categories = "200px";
        this.width_categories__img_categories = "141px";
        this.width_categories__arrows_categories = "550px";

      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.translate_x = "0px";
        this.factor_direction = 0;
        this.amount_of_items_on_screen = 3;
        this.translate_perc_value = -656;
        this.width_categories_categories = "670px";
        this.width_categories_items_categories = "659px";
        this.padding_left_categories_items_categories = "37px";
        this.width_categories_item_categories = "163px";
        this.height_categories__img_categories = "200px";
        this.width_categories__img_categories = "141px";
        this.width_categories__arrows_categories = "723px";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.translate_x = "0px";
        this.factor_direction = 0;
        this.amount_of_items_on_screen = 3;
        this.translate_perc_value = -656;
        this.width_categories_categories = "715px";
        this.width_categories_items_categories = "659px";
        this.padding_left_categories_items_categories = "37px";
        this.width_categories_item_categories = "163px";
        this.height_categories__img_categories = "200px";
        this.width_categories__img_categories = "141px";
        this.width_categories__arrows_categories = "761.08px";

      }
      else {
        this.translate_x = "0px";
        this.factor_direction = 0;
        this.amount_of_items_on_screen = 3;
        this.translate_perc_value = -854;
        this.width_categories_categories = "913px";
        this.width_categories_items_categories = "878px";
        this.padding_left_categories_items_categories = "45px";
        this.width_categories_item_categories = "230px";
        this.height_categories__img_categories = "219px";
        this.width_categories__img_categories = "170px";
        this.width_categories__arrows_categories = "964.08px";

      }

    });

  }

  moveCarousel(direction: string): void {
    if (direction === "left") {
      if (this.factor_direction <= 0) return;
      this.translate_direction = (--this.factor_direction) * this.translate_perc_value;
      this.translate_x = `${this.translate_direction}px`;
      return;

    }

    if (this.factor_direction + 1 >= Math.floor(this.titles.length / this.amount_of_items_on_screen)) return;
    this.translate_direction = (++this.factor_direction) * this.translate_perc_value;
    this.translate_x = `${this.translate_direction}px`;

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();

    }

  }

}
