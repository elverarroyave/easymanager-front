import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  private data: any;

  constructor() { }

  setData(data: any){
    this.data = data;
  }

  getData(){
    const temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}
