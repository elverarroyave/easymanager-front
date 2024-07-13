import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  private URLMaster = environment.server_api_dev + '/master';

  constructor(private httpClient: HttpClient) { }

  public getMasterData(nameHead:string): Observable<any>{
    return this.httpClient.get<any>(this.URLMaster + `/${nameHead}`);
  }
}
