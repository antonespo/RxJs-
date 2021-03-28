import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from './../product-categories/product-category.service';

@Component({
  selector: 'pm-product-table',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnChanges {
  @Input() selectedCategoryId: number;
  @Output() errorMessage = new EventEmitter<string>();

  products$: Observable<Product[]> = this.productService.productWithCategory$.pipe(
    catchError((err) => {
      this.errorMessage.emit(err);
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage.emit(err);
      return EMPTY;
    })
  );

  productSimpleFilter$: Observable<Product[]>

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {console.log(this.selectedCategoryId)}

  ngOnChanges(changes: SimpleChanges){
    this.productSimpleFilter$ = this.productService.productWithCategory$.pipe(
      map((products) =>
        products.filter((product) =>
          this.selectedCategoryId
            ? product.categoryId === this.selectedCategoryId
            : true
        )
      )
    );
  }
}
