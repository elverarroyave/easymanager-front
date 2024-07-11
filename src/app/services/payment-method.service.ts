import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private paymentMethodsURL: string = environment.server_api_dev + '/paymentMethods/';

  constructor(private httpClient: HttpClient) { }

  public getAllPaymentMethods(): Observable<any>{
    return this.httpClient.get<any>(this.paymentMethodsURL);
  }

}
