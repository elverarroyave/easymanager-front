import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientRequestShopping } from 'src/app/model/ClientRequestShopping';
import { ClientsService } from 'src/app/services/clients.service';
import { Tools } from 'src/app/tools/Tools';
import { ShoppingInTable } from './modelShopping/ShoppingInTable';

@Component({
  selector: 'app-shoping-client',
  templateUrl: './shoping-client.component.html',
  styleUrls: ['./shoping-client.component.scss']
})
export class ShopingClientComponent implements OnInit {

  @Input() clientIdRequest: string;
  shoppings: Array<ClientRequestShopping>=[];
  shoppingDetail: Array<ShoppingInTable>=[]; 
  notShopping: boolean = false;

  tools: Tools = new Tools();

  constructor(
    private clientService: ClientsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.clientIdRequest)

    //Cargar datos del cliente
    const id: number = parseInt(this.clientIdRequest);
    this.clientService.findById(id).subscribe(data=>{
      this.shoppings = data.content[0].shopping;
      this.loadDataTable();
    },err=>{
      console.log(err)
    })
  }

  loadDataTable(){
    //debugger
    if(this.shoppings.length != 0){
      this.shoppings.forEach(shopp=>{
        let totalInShopping = 0;
        let totalProducts = 0;
        shopp.productsDetail.forEach(productDetail=>{
          totalInShopping += productDetail.price;
          totalProducts += productDetail.amount
        })
        let shoppingInTable = new ShoppingInTable(
          shopp.id,
          this.tools.dateFormat(shopp.createDate),
          totalProducts,
          totalInShopping
          );
        this.shoppingDetail.push(
          shoppingInTable
        )
      })
      console.log(this.shoppingDetail)
    }else{
      this.notShopping = true;
    }
  }

  goToSale(id){
    console.log('Yendo a la ruta con id:' + id)
    this.router.navigateByUrl(`/clients/client-detail/${this.clientIdRequest}/sale/${id}`)
  }



}
