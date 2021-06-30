import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoResponse } from '../sales/new-sale/modelSale/ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private httpClient: HttpClient) { }

  private URLsale:string = "http://localhost:8080/api/v1/sales";

  public createSale(numDocument: string, productsResponse: Array<ProductoResponse>){
    return this.httpClient.post<any>(this.URLsale + '?numDocument=' + numDocument, productsResponse);
  }

  public findByDateRange(finalDate: string, initDate: String){
    console.log(this.URLsale + `?finalDate=${finalDate}` + `&initDate=${initDate}`)
    return this.httpClient.get<any>(this.URLsale + `?finalDate=${finalDate}` + `&initDate=${initDate}`)
  }
}
