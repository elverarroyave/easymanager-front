import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsURL: string = environment.server_api_dev + '/products/'
  constructor(private httpClient: HttpClient) { }

  public productsByPages(page: number, order:string, size:number, asc: boolean){
    return this.httpClient.get<any>(this.productsURL + 'productsByPages?' + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  public saveProduct(product: Product): Observable<any>{
    return this.httpClient.post<any>(this.productsURL, product);
  }

  public findById(id: number): Observable<any>{
    return this.httpClient.get<any>(this.productsURL + id);
  }

  public updateProduct(id:number, product: Product){
    return this.httpClient.put(this.productsURL + id, product);
  }

  public deleteProdcut(id:number){
    return this.httpClient.delete(this.productsURL + id);
  }

  public findByCode(code:string): Observable<any>{
    return this.httpClient.get<any>(this.productsURL + 'code/' + code);
  }

}
