import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientDetailShoppingComponent } from './clients/client-detail-shopping/client-detail-shopping.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NewSaleComponent } from './sales/new-sale/new-sale.component';
import { SaleConsultDetailComponent } from './sales/sale-consult-detail/sale-consult-detail.component';
import { SalesConsultComponent } from './sales/sales-consult/sales-consult.component';
import { AddDistributorComponent } from './distributors/add-distributor/add-distributor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/add-product', component: AddProductComponent },
  { path: 'products/list-products', component: ListProductComponent },
  { path: 'products/product-detail/:id', component: ProductDetailComponent },
  { path: 'clients/list-clients', component: ListClientsComponent },
  { path: 'clients/add-client', component: AddClientComponent},
  { path: 'clients/client-detail/:id', component: ClientDetailComponent},
  { path: 'clients/client-detail/:id/sale/:idSale', component: ClientDetailShoppingComponent},
  { path: 'sales/new', component: NewSaleComponent},
  { path: 'sales/salesConsult', component: SalesConsultComponent},
  { path: 'sales/saleConsultDetail/:id', component: SaleConsultDetailComponent},
  { path: 'distributors/add', component: AddDistributorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
