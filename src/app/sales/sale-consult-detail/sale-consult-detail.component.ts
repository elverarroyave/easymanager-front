import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { Tools } from 'src/app/tools/Tools';
import { SaleRequest } from './modelSale/saleRequest';


@Component({
  selector: 'app-sale-consult-detail',
  templateUrl: './sale-consult-detail.component.html',
  styleUrls: ['./sale-consult-detail.component.scss']
})
export class SaleConsultDetailComponent implements OnInit {

  tools: Tools = new Tools();
  saleDate: string = "";
  totalPriceSale: number = 0;
  amountProductsSale: number = 0;

  constructor(private salesService:SaleService, private activedRoute: ActivatedRoute) { }

  saleId:number = 0;
  saleRequest: SaleRequest = new SaleRequest();

  ngOnInit(): void {
    this.saleId = parseInt( this.activedRoute.snapshot.params.id );
    this.loadSale(); 
  }

  loadSale(){
    this.salesService.findById(this.saleId).subscribe(data=>{
      this.saleRequest = data;
      //console.log(this.saleRequest)
      this.loadDataSale()
    },err=>{
      console.log(err)
    })
  }

  loadDataSale(){
    this.saleDate = this.tools.dateFormat(this.saleRequest.createDate);
    this.saleRequest.productsDetail.forEach(p=>{
      this.totalPriceSale+=p.totalSale
      this.amountProductsSale+=p.amount
    });
  }

}
