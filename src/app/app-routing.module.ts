import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'products/add-product', component: AddProductComponent
  },
  {
    path: 'products/list-products', component: ListProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
