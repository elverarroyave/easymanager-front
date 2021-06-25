import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRequest } from 'src/app/model/ClientRequest';

import { ClientRequestShopping } from 'src/app/model/ClientRequestShopping';
import { ClientsService } from 'src/app/services/clients.service';
import { Tools } from 'src/app/tools/Tools';

@Component({
  selector: 'app-client-detail-shopping',
  templateUrl: './client-detail-shopping.component.html',
  styleUrls: ['./client-detail-shopping.component.scss']
})
export class ClientDetailShoppingComponent implements OnInit {

  clientRequest: ClientRequest = new ClientRequest();
  clientRequestShopping: ClientRequestShopping = new ClientRequestShopping();

  idClient: number;
  idSale: number;

  amountProducts: number=0;
  totalPrice: number=0

  tools: Tools = new Tools(); 

  constructor(
      private activedRouter: ActivatedRoute,
      private clientsService: ClientsService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.idClient= parseInt(this.activedRouter.snapshot.params.id); 
    this.idSale= parseInt(this.activedRouter.snapshot.params.idSale)
    this.loadData();
  }

  private loadData(){
    //Traer datos del servidor
    this.clientsService.findById(this.idClient).subscribe(data=>{
      this.clientRequest = data.content[0];
      this.loadDataCurrentShopping();
      console.log(this.clientRequest)
    },err=>{
      console.log(err)
    })
  }

  private loadDataCurrentShopping(){
    let shop = this.clientRequest.shopping.filter(shop=>shop.id==this.idSale);
    this.clientRequestShopping = shop[0] as ClientRequestShopping;

    //Formatiar fechas
    this.clientRequestShopping.createDate = this.tools.dateFormat(this.clientRequestShopping.createDate);
    this.clientRequestShopping.updateDate = this.tools.dateFormat(this.clientRequestShopping.updateDate)

    //Capturando cantidad de productos comprados y el totalPrice.
    this.clientRequestShopping.productsDetail.forEach(productDetail=>{
      this.amountProducts += productDetail.amount;
      this.totalPrice += productDetail.price;
      console.log(this.amountProducts, this.totalPrice)
    })

    console.log(this.clientRequestShopping)
  }

  returnClientDetail(){
    this.router.navigateByUrl('/clients/client-detail/'+this.idClient)
  }



}
