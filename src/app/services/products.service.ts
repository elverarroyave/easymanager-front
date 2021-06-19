import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsURL: string = 'http://localhost:8080/api/v1/products/productsByPages?'
  constructor(private httpClient: HttpClient) { }

  public productsByPages(page: number, order:string, size:number, asc: boolean){
    console.log(this.productsURL + `page=${page}&size=${size}&order=${order}&asc=${asc}`)
    return this.httpClient.get<any>(this.productsURL + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

}
