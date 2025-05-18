import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient

  ) { }

  requestApi(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("../../assets/products/products.json");

  }

}
