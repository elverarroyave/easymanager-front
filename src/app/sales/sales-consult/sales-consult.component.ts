import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { SaleInTable } from './model-sales-consult/SaleInTable';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-sales-consult',
  templateUrl: './sales-consult.component.html',
  styleUrls: ['./sales-consult.component.scss']
})
export class SalesConsultComponent implements OnInit {

  //Formulario
  formDateGroup: UntypedFormGroup;

  //Sales
  salesRequest: Array<any> = new Array<any>();

  salesInTable: Array<SaleInTable> = new Array<SaleInTable>();

  totalSalesPrice: number=0;

  constructor(
    private fb: UntypedFormBuilder,
    private saleService: SaleService,
    private router: Router,
    private alertService: AlertService) { }

  otherRange: boolean = false;

  ngOnInit(): void {
    this.formDate();
  }

  formDate(){
    this.formDateGroup = this.fb.group({
      initDate:['', Validators.required],
      finalDate:['', Validators.required]
    })
  }

  btnOtherRange(){
    this.otherRange = !this.otherRange;
  }

  consultByOther(){
    this.loadData(this.formDateGroup.value.initDate,this.formDateGroup.value.finalDate)
  }

  consultByDies(numDais: number){
    let finalDate: Date = new Date();
    let initDate: Date = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      finalDate.getDate()-numDais
    );
    this.loadData(initDate.toISOString().substring(0,10),finalDate.toISOString().substring(0,10));
  }

  loadData(finalDate: string, initDate: string){
    this.salesRequest.length = 0;
    this.saleService.findByDateRange(initDate,finalDate).subscribe(data=>{
      this.salesRequest = data
      this. loadSalesInTable();
    },err=>{
      this.alertService.infoAlet('Upss! ',err.error);
    })
  }

  loadSalesInTable(){
    this.salesInTable.length = 0;
    this.totalSalesPrice = 0;
    this.salesRequest.forEach(sale=>{
      let amount: number = 0;
      let total: number = 0;
      sale.productsDetail.forEach(p=>{
        amount += p.amount;
        total += p.totalSale;
      })
      let saleInTable: SaleInTable = new SaleInTable(
        sale.id,
        sale.createDate,
        sale.user.document,
        sale.client.document,
        amount,
        total
      )
      this.salesInTable.push(saleInTable);
      this.totalSalesPrice += total;
    })
    this.salesInTable.reverse();
  }

  goToSale(id: number){
    this.router.navigateByUrl('/sales/saleConsultDetail/'+id);
  }

}
