import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-product-list-container',
  templateUrl: './product-list-container.component.html'
})
export class ProductListContainerComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  constructor() { }

  ngOnInit(): void {
  }

  setErrorMessage(errorMessage: string){
    this.errorMessage = errorMessage;
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
