import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public successAlet(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'success'
    })
  }

  public errorAlert(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'error'
    })
  }

  public infoAlet(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'info'
    })
  }
}
