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
  size: number=12;
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
      console.log(data.content)
      this.products = this.products.concat(data.content);
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages);
      console.log(this.products)
    },
    err=>{
      console.log(err.error);
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
