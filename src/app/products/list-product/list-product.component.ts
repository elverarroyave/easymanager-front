import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  page: number=0;
  size: number=8;
  order: string= 'name';
  asc: boolean= false;

  totalPages: number[] = [];


  isFirst: boolean= false;
  isLast: boolean= false;

  products: Array<any> = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productsService.productsByPages(this.page, this.order, this.size, this.asc).subscribe(data=>{
      this.products = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
      console.log(data);
    },
    err=>{
      console.log(err.error);
    })
  }

  rewind(){
    if(!this.isFirst){
      this.page--;
      this.loadProducts();
    }
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

  accion(event){
    if(event == 'eliminar'){
      console.log('Click en Eliminar')
    }else{
      console.log('Click en body')
    }
  }


}
