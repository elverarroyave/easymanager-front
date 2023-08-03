import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Distributor } from '../model/Distributor';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  private URLDistributor = environment.server_api_dev + "/distributors/";
  constructor(private httpClient: HttpClient){};

  public saveDistributor(distributor: Distributor){
    return this.httpClient.post<any>(this.URLDistributor, distributor);
  }

}
