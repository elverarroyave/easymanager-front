import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distributor } from 'src/app/model/Distributor';
import { AlertService } from 'src/app/services/alert.service';
import { DistributorService } from 'src/app/services/distributor.service';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.scss']
})
export class AddDistributorComponent implements OnInit {

  formDistributor: FormGroup

  distributor: Distributor

  constructor(
    private fb: FormBuilder,
    private distributorService: DistributorService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.formDistributor = this.fb.group({
      name:['', Validators.required],
      nit:['', Validators.required],
      phone:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      address:['', Validators.required],
    })
  }

  saveDistributor(){
    this.distributor= {
      name: this.formDistributor.value.name,
      nit: this.formDistributor.value.nit,
      numberPhone: this.formDistributor.value.phone,
      email: this.formDistributor.value.email,
      address: this.formDistributor.value.address,
    }
    this.distributorService.saveDistributor(this.distributor).subscribe(data=>{
      this.alertService.successAlet('¡Distribuidor Agregao!', `${this.distributor.name}, agregado correctamente.`)
    },err=>{
      this.alertService.errorAlert('Opss', `${err.error}`)
      console.log(err)
    })
  }

}
