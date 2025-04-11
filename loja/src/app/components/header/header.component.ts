import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy

} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faShoppingCart,
  faMagnifyingGlass,
  faXmark,
  faUser

} from '@fortawesome/free-solid-svg-icons';

import { ResponsiveService } from '../../services/responsive.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding("style.--width-search-bar-header") width_search_bar_style!: string;
  @HostBinding("style.--font-size-h1-header") font_size_h1_style!: string;

  protected faShoppingCart = faShoppingCart;
  protected faMagnifyingGlass = faMagnifyingGlass;
  protected faXmark = faXmark;
  protected faUser = faUser;

  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';

  private sub!: Subscription;

  private width_search_bar = "70%";
  private font_size_h1 = "2.4em";

  showSearchBar: boolean = false;
  showCloseButton: boolean = false;

  constructor(private responsive$: ResponsiveService) {}

  ngOnInit(): void {
    this.sub = this.responsive$.onBreakpointChange().subscribe((state) => {
      this.showSearchBar = (state.breakpoints[this.XSMALL] || state.breakpoints[this.SMALL]) ? false : true;
      this.showCloseButton = false;

      if (state.breakpoints[this.XSMALL]) {
        this.width_search_bar = "40%";
        this.font_size_h1 = "1.3em";

      }
      else if (state.breakpoints[this.SMALL]) {
        this.width_search_bar = "60%";
        this.font_size_h1 = "1.5em";

      }
      else if (state.breakpoints[this.MEDIUM]) {
        this.width_search_bar = "60%";
        this.font_size_h1 = "1.9em";

      }
      else if (state.breakpoints[this.LARGE]) {
        this.width_search_bar = "60%";
        this.font_size_h1 = "2.0em";

      }
      else {
        this.width_search_bar = "65%";
        this.font_size_h1 = "2.4em";

      }

      this.width_search_bar_style = this.width_search_bar;
      this.font_size_h1_style = this.font_size_h1;

    })

  }

  submit(): void {
    if (!this.showSearchBar) {
      this.showSearchBar = !this.showSearchBar;
      this.showCloseButton = !this.showCloseButton;
      this.width_search_bar_style = "87%";

    }

  }

  close(): void {
    if (this.showSearchBar) {
      this.showSearchBar = !this.showSearchBar;
      this.showCloseButton = !this.showCloseButton;
      this.width_search_bar_style = this.width_search_bar;

    }

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();

    }

  }

}
