import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/model/Inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  constructor(private inventoryService: InventoryService) { }

  page: number=0;
  size: number=12;
  order: string= 'name';
  asc: boolean= false;

  totalPages: number[] = [];


  isFirst: boolean= false;
  isLast: boolean= false;

  inventory: Array<Inventory> = [];

  ngOnInit(): void {
    this.loadProducts();
    this.loadInventory();
  }

  loadProducts(){
    this.inventoryService.getInventoryByPages(this.page, 'id', this.size, this.asc).subscribe(data=>{
      this.inventory = this.inventory.concat(data.content);
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
    },
    err=>{
      console.log(err.error);
    })
  }

  loadInventory(){
    this.inventoryService.getInventoryByPages(this.page, 'id', this.size, this.asc).subscribe(data=>{
      console.log(data)
    }, err=>{
      console.log(err.error)
    })
  }

  forward(){
    if(!this.isLast){
      this.page++
      this.loadProducts();
    }
  }

  setNumberPage(page: number){
    this.page = page
    this.loadProducts();
  }


}
