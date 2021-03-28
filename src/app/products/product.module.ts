import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ProductShellComponent } from './product-list-alt/product-shell.component';
import { ProductDetailComponent } from './product-list-alt/product-detail.component';

import { SharedModule } from '../shared/shared.module';
import { ProductListAltComponent } from './product-list-alt/product-list-alt.component';
import { ProductListContainerComponent } from './product-list-container.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListContainerComponent
      },
      {
        path: ':alternate',
        component: ProductShellComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductShellComponent,
    ProductListAltComponent,
    ProductDetailComponent,
    ProductListContainerComponent
  ]
})
export class ProductModule { }
