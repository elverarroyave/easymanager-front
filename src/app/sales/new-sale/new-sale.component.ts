import { Component, OnInit } from '@angular/core';
import { Tools } from 'src/app/tools/Tools';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})
export class NewSaleComponent implements OnInit {


  //Fecha
  currentDate: string;
  tools:Tools = new Tools();

  constructor() { }

  ngOnInit(): void {
    this.currentDate =  new Date().toString();
  }


}
