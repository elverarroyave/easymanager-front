import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  page: number=0;
  size: number=10;
  order: string="id";
  asc: boolean = false;

  totalPages: number[] = [];

  isFirst:boolean=false;
  isLast:boolean=false;

  clients: Array<any> = [];

  formSize: FormGroup;

  constructor(private clientsService: ClientsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadClients();

    this.formSize=this.fb.group({
      size:['10'],
    });
  }

  setSize(){
    this.size = parseInt(this.formSize.value.size)
    this.loadClients();
  }

  private loadClients(){
    this.clientsService.clientsByPages(this.page, this.order, this.size, this.asc).subscribe(data=>{
      this.clients = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages)
      //console.log(data)
    })
  }

  sort(){
    this.asc = !this.asc
    this.loadClients();  
  }

  orderBy(parameter: string){
    this.order = parameter;
    this.sort();
  }

  rewind(){
    if(!this.isFirst){
      this.page--;
      this.loadClients();
    }
  }

  forward(){
    if(!this.isLast){
      this.page++;
      this.loadClients();
    }
  }

  setNumberPage(page: number){
    this.page = page
    this.loadClients();
  }

  selectClient(id: string){
    this.router.navigateByUrl("/clients/client-detail/" + id)
  }


}
