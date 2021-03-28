import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  selector: 'pm-product-list-container',
  templateUrl: './product-list-container.component.html'
})
export class ProductListContainerComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  selectedCategoryId: number; 

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
  }

  setErrorMessage(errorMessage: string){
    this.errorMessage = errorMessage;
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.selectedCategoryId = +categoryId;
  }
}
