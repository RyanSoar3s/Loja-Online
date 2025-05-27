import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAreaComponent } from './product-area.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductsComponent', () => {
  let component: ProductAreaComponent;
  let fixture: ComponentFixture<ProductAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAreaComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
