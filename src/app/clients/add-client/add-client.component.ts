import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/Client';
import { AlertService } from 'src/app/services/alert.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  formClient: FormGroup;

  client: Client;

  constructor(
      private fb: FormBuilder,
      private clientsService: ClientsService,
      private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.formClient = this.fb.group({
      name:['Sara Sofia', Validators.required],
      lastName:['Arrieta Rojas', Validators.required],
      email:['sara123@gmail.com', Validators.compose([Validators.required, Validators.email])],
      address:['Calle 26#26 a 52', Validators.required],
      phone:['3207859665'],
      document:['987654321']
    })
  }

  saveClient(){
    this.client = new Client(
      this.formClient.value.name,
      this.formClient.value.lastName,
      this.formClient.value.email,
      this.formClient.value.address,
      this.formClient.value.phone,
      this.formClient.value.document
    )

    this.clientsService.saveClient(this.client).subscribe(data =>{
      this.alertService.successAlet('¡Cliente Agregado!', `${this.client.name}, agregado correctamente.`)
    },err=>{
      this.alertService.errorAlert('Opss', `${err.error}`)
      console.log(err)
    })
  }

}
