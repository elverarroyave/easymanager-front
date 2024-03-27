import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventoryURL: string = environment.server_api_dev + '/inventory/';
  constructor(private httpClient: HttpClient) { }

  public getInventoryByPages(page: number, order: string, size: number, asc: boolean){
    return this.httpClient.get<any>(this.inventoryURL + 'inventoryByPages?' + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
}
