import { Component } from '@angular/core';
import { PromotionComponent } from '@components/promotion/promotion.component';
import { CategoriesComponent } from '@components/categories/categories.component';
import { ProductsComponent } from '@components/products/products.component';

@Component({
  selector: 'app-main-content',
  imports: [
    PromotionComponent,
    CategoriesComponent,
    ProductsComponent

  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {


}
