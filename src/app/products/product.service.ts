import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { catchError, delay, map, scan, shareReplay, tap } from 'rxjs/operators';

import { Product } from './product';
import { Supplier } from '../suppliers/supplier';
import { SupplierService } from '../suppliers/supplier.service';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from './../product-categories/product-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  addedProductSubject = new Subject<Product>();
  addedProductAction$ = this.addedProductSubject.asObservable();

  productIdSubject = new BehaviorSubject<number>(0);
  productIdAction$ = this.productIdSubject.asObservable();

  products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    delay(500),
    shareReplay(1),
    tap((data) => console.log('Products: ', data)),
    catchError((err) => this.handleError(err))
  );

  productWithAdded$ = merge(this.products$, this.addedProductAction$).pipe(
    scan((acc: Product[], added: Product) => [...acc, added])
  );

  productWithCategory$ = combineLatest([
    this.productWithAdded$,
    this.productCategoryService.productCategories$,
  ]).pipe(
    map(([products, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            category: categories.find((c) => c.id === product.categoryId).name,
            searchKey: [product.productName],
          } as Product)
      )
    ),
    tap((data) => console.log('Productsw with categories: ', data))
  );

  selectedProduct$ = combineLatest([
    this.productWithCategory$,
    this.productIdAction$,
  ]).pipe(
    map(([products, productId]) => products.find((p) => p.id === productId))
  );

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService
  ) {}

  fakeProduct(): Product {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      // category: 'Toolbox',
      quantityInStock: 30,
    };
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
