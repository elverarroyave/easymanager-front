import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { Tools } from 'src/app/tools/Tools';
import { SaleRequest } from './modelSale/saleRequest';
import { DataSharingServiceService } from 'src/app/services/data-sharing-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sale-consult-detail',
  templateUrl: './sale-consult-detail.component.html',
  styleUrls: ['./sale-consult-detail.component.scss']
})
export class SaleConsultDetailComponent implements OnInit {

  tools: Tools = new Tools();
  saleDate: string = "";
  amountProductsSale: number = 0;

  constructor(
    private salesService:SaleService,
    private activedRoute: ActivatedRoute,
    private dataSharingService: DataSharingServiceService,
    private router: Router
  ) { }

  saleId:number = 0;
  saleRequest: SaleRequest = new SaleRequest();
  buttonName: string = "Volver";
  routeToBack: string = "/sales/salesConsult";

  toBack: any;

  ngOnInit(): void {
    this.saleId = parseInt( this.activedRoute.snapshot.params.id );
    this.toBack = this.dataSharingService.getData();
    console.log(this.toBack)
    this.loadSale();
  }

  ngAfterViewInit(){
    if(this.toBack != undefined){
    setTimeout(() => {
        this.buttonName = this.toBack.nameButton;
        this.routeToBack = this.toBack.route
      });
    }
  }

  loadSale(){
    this.salesService.findById(this.saleId).subscribe(data=>{
      this.saleRequest = data;
      this.loadDataSale()
    },err=>{
      console.log(err)
    })
  }

  loadDataSale(){
    this.saleDate = this.tools.dateFormat(this.saleRequest.createDate);
  }

  goToBack(){
    this.router.navigateByUrl(this.routeToBack);
  }

}
