import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientRequestShopping } from 'src/app/model/ClientRequestShopping';
import { SaleService } from 'src/app/services/sale.service';
import { ShoppingInTable } from './modelShopping/ShoppingInTable';
import { DataSharingServiceService } from 'src/app/services/data-sharing-service.service';

@Component({
  selector: 'app-shoping-client',
  templateUrl: './shoping-client.component.html',
  styleUrls: ['./shoping-client.component.scss']
})
export class ShopingClientComponent implements OnInit {

  @Input() clientIdRequest: string;
  shoppings: Array<ClientRequestShopping>=[];
  shoppingDetail: Array<ShoppingInTable>=[];
  notShopping: boolean = false;

  constructor(
    private salesService: SaleService,
    private router: Router,
    private dataSharingService: DataSharingServiceService
    ) { }

  ngOnInit(): void {
    //Cargar datos del cliente
    const id: number = parseInt(this.clientIdRequest);
    this.salesService.findSalesOfClient(id).subscribe(data=>{
      this.shoppings = data
      this.loadDataTable();
    },err=>{
      console.log(err)
    })
  }

  loadDataTable(){
    //debugger
    if(this.shoppings.length != 0){
      this.shoppings.forEach(shopp=>{
        let totalInShopping = 0;
        let totalProducts = 0;
        shopp.productsDetail.forEach(productDetail=>{
          totalInShopping += productDetail.totalSale;
          totalProducts += productDetail.amount
        })
        let shoppingInTable = new ShoppingInTable(
          shopp.id,
          shopp.createDate,
          totalProducts,
          totalInShopping
          );
        this.shoppingDetail.push(
          shoppingInTable
        )
      })
      this.shoppingDetail.reverse();
    }else{
      this.notShopping = true;
    }
  }

  goToSale(id){
    this.dataSharingService.setData({
      route: `/clients/client-detail/${this.clientIdRequest}`,
      nameButton: 'Volver a detalles del cliente'
    })
    this.router.navigateByUrl(`/sales/saleConsultDetail/${id}`)
  }



}
