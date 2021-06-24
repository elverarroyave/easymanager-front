import { Component, OnInit } from '@angular/core';
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

  constructor(private clientsService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(){
    this.clientsService.clientsByPages(this.page, this.order, this.size, this.asc).subscribe(data=>{
      this.clients = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data.totalPages)
    })
  }

  sort(){
    this.asc = !this.asc
    this.loadClients();  
    console.log('Click en sort', this.asc)
  }

  rewind(){
    if(!this.isFirst){
      this.page--;
      this.loadClients();
      console.log('Rewind')
    }
  }

  forward(){
    if(!this.isLast){
      this.page++;
      this.loadClients();
      console.log('Forward')
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
