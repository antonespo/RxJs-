import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { SupplierService } from 'src/app/suppliers/supplier.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessageSubject = new Subject();
  errorMessageAction$ = this.errorMessageSubject.asObservable();
  product: Product;
  productSuppliers;
  product$ = this.productService.selectedProduct$.pipe(
    catchError((error) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  suppliers$ = this.supplierService.suppliers$.pipe(
    catchError((error) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  // suppliers$ = combineLatest([
  //   this.product$,
  //   this.supplierService.suppliers$,
  // ]).pipe(
  //   map(([product, suppliers]) =>
  //     product.supplierIds?.map((suppId) =>
  //       suppliers.find((supplier) => supplier.id === suppId)
  //     )
  //   )
  // );

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}
}
