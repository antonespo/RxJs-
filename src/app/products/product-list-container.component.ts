import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  Subject,
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-list-container',
  templateUrl: './product-list-container.component.html',
})
export class ProductListContainerComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productWithCategory$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, category]) =>
      products.filter((product) =>
        (category !== 0) ? product.categoryId === category : true
      )
    ),
    tap((product) => console.log(product)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onSelected(event: Event): void {
    this.categorySelectedSubject.next(+(<HTMLSelectElement>event.target).value);
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }
}
