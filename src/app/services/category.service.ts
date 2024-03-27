import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesURL= environment.server_api_dev + "/categories/"
  constructor(private httpClient: HttpClient) { }

  public getAllCatetories(): Observable<any>{
    return this.httpClient.get<any>(this.categoriesURL);
  }
}
