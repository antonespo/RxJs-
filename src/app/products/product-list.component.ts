import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-table',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Output() errorMessage = new EventEmitter<string>();

  products$: Observable<Product[]> = this.productService.products$.pipe(
    catchError((err) => {
      this.errorMessage.emit(err);
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) {}
}
