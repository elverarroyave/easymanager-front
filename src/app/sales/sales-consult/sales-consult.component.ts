import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { Tools } from 'src/app/tools/Tools';
import { SaleInTable } from './model-sales-consult/SaleInTable';
import { SaleRequest } from './model-sales-consult/SaleRequest';

@Component({
  selector: 'app-sales-consult',
  templateUrl: './sales-consult.component.html',
  styleUrls: ['./sales-consult.component.scss']
})
export class SalesConsultComponent implements OnInit {

  //Formulario
  formDateGroup: FormGroup;

  //Sales
  salesRequest: Array<SaleRequest> = new Array<SaleRequest>();

  salesInTable: Array<SaleInTable> = new Array<SaleInTable>();

  totalSalesPrice: number=0;

  constructor(private fb: FormBuilder, private saleService: SaleService) { }

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
      console.log(this.salesRequest)
      this. loadSalesInTable();
    },err=>{
      console.log(err)
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
        sale.user.name,
        amount,
        total
      )
      this.salesInTable.push(saleInTable);
      this.totalSalesPrice += total;
    })
    this.salesInTable.reverse();
  }

}
