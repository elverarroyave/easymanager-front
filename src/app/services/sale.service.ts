import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoResponse } from '../sales/new-sale/modelSale/ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private httpClient: HttpClient) { }

  private URLsale:string = environment.server_api_dev + '/sales';

  public createSale(numDocument: string, productsResponse: Array<ProductoResponse>){
    return this.httpClient.post<any>(this.URLsale + '?numDocument=' + numDocument, productsResponse);
  }

  public findByDateRange(finalDate: string, initDate: String){
    //console.log(this.URLsale + `?finalDate=${finalDate}` + `&initDate=${initDate}`)
    return this.httpClient.get<any>(this.URLsale + `?finalDate=${finalDate}` + `&initDate=${initDate}`);
  }

  public findById(id: number){
    return this.httpClient.get<any>(this.URLsale + `/${id}`);
  }

  public findSalesOfClient(id: number){
    return this.httpClient.get<any>(this.URLsale + '/findByClient' + `/${id}`);
  }
}
