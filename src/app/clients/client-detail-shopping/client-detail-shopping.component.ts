import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleRequest } from 'src/app/sales/sale-consult-detail/modelSale/saleRequest';

import { SaleService } from 'src/app/services/sale.service';
import { Tools } from 'src/app/tools/Tools';

@Component({
  selector: 'app-client-detail-shopping',
  templateUrl: './client-detail-shopping.component.html',
  styleUrls: ['./client-detail-shopping.component.scss']
})
export class ClientDetailShoppingComponent implements OnInit {

  idClient: number;
  idSale: number;

  saleRequest: SaleRequest = new SaleRequest();

  tools: Tools = new Tools();
  saleCreateDate="";
  amountProductsSale: number=0;
  totalPriceSale: number=0

  constructor(
      private activedRouter: ActivatedRoute,
      private saleService: SaleService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.idClient= parseInt(this.activedRouter.snapshot.params.id); 
    this.idSale= parseInt(this.activedRouter.snapshot.params.idSale)
    this.loadData();
  }

  private loadData(){
    //Traer datos del servidor
    this.saleService.findById(this.idSale).subscribe(data=>{
      this.saleRequest = data;
      //console.log(this.clientRequest)
      this.loadDataCurrentShopping();
    },err=>{
      console.log(err)
    })
  }

  private loadDataCurrentShopping(){
    this.saleCreateDate = this.tools.dateFormat(this.saleRequest.createDate);
    this.saleRequest.productsDetail.forEach(p=>{
      this.totalPriceSale+=p.totalSale
      this.amountProductsSale+=p.amount
    });
  }

  returnClientDetail(){
    this.router.navigateByUrl('/clients/client-detail/'+this.idClient)
  }



}
