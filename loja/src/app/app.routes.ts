import { Routes } from '@angular/router';
import { ProductViewerComponent } from '@components/product-viewer/product-viewer.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { MainContentComponent } from '@components/main-content/main-content.component';
import { SearchProductsComponent } from '@components/search-products/search-products.component';
import { ProductsComponent } from '@components/products/products.component';

export const routes: Routes = [
  { path: "", component: MainContentComponent },
  {
    path: "produtos",
    component: SearchProductsComponent,
    children: [
      { path: "", component: ProductsComponent },
      { path: "produto", component: ProductViewerComponent },
      { path: "**", redirectTo: "nao-encontrado/404" }

    ]

  },
  { path: "nao-encontrado/404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "nao-encontrado/404" }

];
