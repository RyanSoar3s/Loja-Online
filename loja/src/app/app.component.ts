import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { Product } from '@models/products.model';
import { ApiService } from '@services/api.service';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'loja';

  constructor(
    private api: ApiService,
    private productsService: ProductsService

  ) {}

  ngOnInit(): void {
    this.api.requestApi().subscribe((data: Array<Product>) => {
      this.productsService.setProducts(data);
      
    });

  }

}
