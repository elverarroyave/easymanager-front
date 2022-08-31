import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeadComponent } from './head/head.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ShopingClientComponent } from './clients/shoping-client/shoping-client.component';
import { ClientDetailShoppingComponent } from './clients/client-detail-shopping/client-detail-shopping.component';
import { NewSaleComponent } from './sales/new-sale/new-sale.component';
import { SalesConsultComponent } from './sales/sales-consult/sales-consult.component';
import { SaleConsultDetailComponent } from './sales/sale-consult-detail/sale-consult-detail.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    HomeComponent,
    AddProductComponent,
    ListProductComponent,
    ProductDetailComponent,
    ListClientsComponent,
    AddClientComponent,
    ClientDetailComponent,
    ShopingClientComponent,
    ClientDetailShoppingComponent,
    NewSaleComponent,
    SalesConsultComponent,
    SaleConsultDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
