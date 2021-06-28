import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoResponse } from '../sales/new-sale/modelSale/ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private httpClient: HttpClient) { }

  private URLsale:string = "http://localhost:8080/api/v1/sales?numDocument=";

  public createSale(numDocument: string, productsResponse: Array<ProductoResponse>){
    return this.httpClient.post<any>(this.URLsale + numDocument, productsResponse);
  }
}
