import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/add-product', component: AddProductComponent },
  { path: 'products/list-products', component: ListProductComponent },
  { path: 'products/product-detail/:id', component: ProductDetailComponent },
  { path: 'clients/list-clients', component: ListClientsComponent },
  { path: 'clients/add-client', component: AddClientComponent},
  { path: 'clients/client-detail/:id', component: ClientDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
