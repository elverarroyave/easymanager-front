import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { ClientRequest } from 'src/app/model/ClientRequest';
import { AlertService } from 'src/app/services/alert.service';

import { ClientsService } from 'src/app/services/clients.service';
import { Tools } from 'src/app/tools/Tools';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  //Variables
  formClientDetail: FormGroup;
  clientRquest: ClientRequest = new ClientRequest();
  clientId: string;
  
  tools: Tools = new Tools();

  isEdit: boolean = false;

  constructor(
    private clientsService: ClientsService,
    private activateddRoute: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder,
    private ruote: Router
  ) {}

  ngOnInit(): void {
    this.clientId = this.activateddRoute.snapshot.params.id;
    //Find client by id
    const id: number = parseInt(this.activateddRoute.snapshot.params.id);
    this.clientsService.findById(id).subscribe(
      (data) => {
        this.clientRquest = data.content[0] as ClientRequest;
        //console.log(this.clientRquest)
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );

    //Formulario
    this.formClientDetail = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      phone: [''],
      document: [''],
    });

    this.formClientDetail.disable();
  }

  loadData() {
    this.formClientDetail.setValue({
      name: this.clientRquest.name,
      lastName: this.clientRquest.lastName,
      email: this.clientRquest.email,
      address: this.clientRquest.address,
      phone: this.clientRquest.numPhone,
      document: this.clientRquest.numDocument,
    });
    this.clientRquest.createDate = this.tools.dateFormat(
      this.clientRquest.createDate
    );
    this.clientRquest.updateDate = this.tools.dateFormat(
      this.clientRquest.updateDate
    );
  }

  editClient() {
    const id: number = this.clientRquest.id;
    let clientToUpdate: Client = new Client(
      this.formClientDetail.value.name,
      this.formClientDetail.value.lastName,
      this.formClientDetail.value.email,
      this.formClientDetail.value.address,
      this.formClientDetail.value.phone,
      this.formClientDetail.value.document
    );
    this.clientsService.updateClient(id, clientToUpdate).subscribe(
      (data) => {
        this.alertService.infoAlet(
          '¡Cliente Actualizado!',
          `${this.clientRquest.name}, actualizado correctamente.`
        );
        this.ruote.navigateByUrl('clients/list-clients');
      },
      (err) => {
        this.alertService.errorAlert('Ops', `${err.error}`);
        console.log(err);
      }
    );
  }

  isEditable() {
    this.isEdit = true;
    this.formClientDetail.enable();
  }

  noEditable() {
    this.isEdit = false;
    this.formClientDetail.disable();
  }
}
