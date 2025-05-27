import { Component } from '@angular/core';
import { PromotionComponent } from '@components/promotion/promotion.component';
import { CategoriesComponent } from '@components/categories/categories.component';
import { ProductAreaComponent } from '@components/product-area/product-area.component';

@Component({
  selector: 'app-main-content',
  imports: [
    PromotionComponent,
    CategoriesComponent,
    ProductAreaComponent

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  
}
