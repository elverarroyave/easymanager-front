import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/Client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private URLClient= environment.server_api_dev + "/clients/"
  constructor(private httpClient: HttpClient) { }

  public clientsByPages(page: number, order: string, size: number, asc: boolean){
    return this.httpClient.get<any>(this.URLClient + 'clientsByPages?' + `page=${page}&size=${size}&order=${order}&asc=${asc}`)
  }

  public saveClient(client: Client){
    return this.httpClient.post<any>(this.URLClient, client);
  }

  public findById(id: number){
    return this.httpClient.get<any>(this.URLClient + id);
  }

  public findByDocument(numDocument: string){
    return this.httpClient.get<any>(this.URLClient + 'document/' + numDocument);
  }

  public updateClient(id: number, client:Client){
    return this.httpClient.put<any>(this.URLClient + id, client);
  }

  public deleteClient(id: string){
    return this.httpClient.delete<any>(this.updateClient + id);
  }
}
