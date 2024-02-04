import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientRequest } from 'src/app/model/ClientRequest';
import { ProductRequest } from 'src/app/model/ProductRequest';
import { AlertService } from 'src/app/services/alert.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ProductsService } from 'src/app/services/products.service';
import { SaleService } from 'src/app/services/sale.service';
import { Tools } from 'src/app/tools/Tools';
import Swal from 'sweetalert2';
import { ProductInTable } from './modelSale/ProductInTable';
import { ProductoResponse } from './modelSale/ProductResponse';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
  providers:[ProductsService]
})
export class NewSaleComponent implements OnInit {
  //Formularios
  formGroupClient: UntypedFormGroup;
  formGroupProduct: UntypedFormGroup;

  //Modelos
  clientRequest: ClientRequest;
  productRequest: ProductRequest;

  //Fecha
  currentDate: string;

  //Modelo de producto en tabla
  productsInTable: Array<ProductInTable> = new Array<ProductInTable>();

  //ProductoResponse
  productsResponse: Array<ProductoResponse> = new Array<ProductoResponse>();

  //Desactivar boton realizar compra
  isActiveBtnShopping: boolean;

  //Total price shopping
  totalSalePrice: number = 0;

  //Herramienta
  tools: Tools = new Tools();

  //Variables de consulta producto por nombre
  productsByName$: Observable<any[]>;
  productName: string = 'name';


  constructor(
    private clientsService: ClientsService,
    private productService: ProductsService,
    private saleService: SaleService,
    private fb: UntypedFormBuilder,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date().toString();

    //Cargamos los formularios
    this.formClient();
    this.formProduct();

    this.clientRequest = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      address: '',
      numPhone: '',
      numDocument: '',
    }

    this.productRequest = {
      id: 0,
      baseQuantity: 0,
      brand: '',
      category: '',
      code: '',
      description: '',
      name: '',
      privatePrice: 0,
      publicPrice: 0,
      stock: 0
    }

    this.isActiveBtnShopping = false;

  }

  ngDoCheck() {
    //ActiveBtnShopping
    this.isActiveBtnShopping =
      this.productsInTable.length != 0 && this.clientRequest.id != 0;
      console.log(this.isActiveBtnShopping);
  }

  //formulario de cliente
  private formClient() {
    this.formGroupClient = this.fb.group({
      document: ['', Validators.required],
    });
  }

  private formProduct() {
    this.formGroupProduct = this.fb.group({
      code: ['', Validators.required],
      name: ['']
    });
  }

  loadClient() {
    const numDocument = this.formGroupClient.value.document;
    this.clientsService.findByDocument(numDocument).subscribe(
      (data) => {
        this.clientRequest = data.content[0];
      },
      (err) => {
        console.log(err);
        this.alert.infoAlet('Cliente no encontrado', `${err.error}`);
      }
    );
  }

  loadProduct() {
    const code = this.formGroupProduct.value.code;
    this.productService.findByCode(code).subscribe(
      (data) => {
        this.productRequest = data.content[0];
        this.formGroupProduct.reset();
        this.addProductInTable(this.productRequest);
      },
      (err) => {
        this.alert.infoAlet('Opss', `${err.error}`);
      }
    );
  }

  addProductInTable(product: ProductRequest) {
    //Coroborar si el producto esta añadido.
    let exist: boolean = false;
    this.productsInTable.forEach((p) => {
      if (p.code == product.code) {
        p.amount += 1;
        p.totalPrice = p.unitPrice * p.amount;
        exist = true;
      }
    });

    if (!exist) {
      let productInTable: ProductInTable ={
        code: product.code,
        name: product.name,
        amount: 1,
        unitPrice: product.publicPrice,
        totalPrice: product.publicPrice
      };


      this.productsInTable.push(productInTable);
    }
    this.updateTotal();
    this.productsInTable.reverse();
  }

  playShopping() {
    Swal.fire({
      title: '¿Realizar venta?',
      confirmButtonText: `Vender`,
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createShopping();
        Swal.fire('Venta Realizada!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Compra cancelada', '', 'warning');
      }
    });
  }

  private createShopping() {
    this.productsResponse.length = 0;
    this.productsInTable.forEach((productInTable) => {
      let productResponse: ProductoResponse = {
        code: productInTable.code,
        quantity: productInTable.amount
      };
      this.productsResponse.push(productResponse);
    });

    this.saleService
      .createSale(this.clientRequest.numDocument, this.productsResponse)
      .subscribe(
        (data) => {
          this.resetForm();
        },
        (err) => {
          console.log(err);
          this.alert.infoAlet('Stock Insuficiente', err.error);
        }
      );
  }

  deleteProductInTable(code: string) {
    Swal.fire({
      title: 'Eliminar producto de la lista?',
      confirmButtonText: `Eliminar`,
      confirmButtonColor: '#ea5455',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#6e7d88',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productsInTable = this.productsInTable.filter(
          (p) => p.code != code
        );
        Swal.fire('Eliminado!', '', 'warning');
        this.updateTotal();
      } else if (result.isDenied) {
        Swal.fire('No eliminado', '', 'info');
      }
    });
  }

  updateTotalPriceProduct(index: number) {
    this.productsInTable[index].totalPrice =
      this.productsInTable[index].unitPrice *
      this.productsInTable[index].amount;
    this.updateTotal();
  }

  updateTotal() {
    this.totalSalePrice = 0;
    this.productsInTable.forEach((p) => (this.totalSalePrice += p.totalPrice));
  }


  private resetForm(){
    this.productsInTable.length = 0;
    this.totalSalePrice=0;
    this.formGroupClient.reset();
    this.formGroupProduct.reset();

    this.clientRequest = {
      id: 0,
      name: null,
      lastName: null,
      email: null,
      address: null,
      numPhone: null,
      numDocument: null,
      createDate: null,
      updateDate: null
    }

    this.productRequest = {
      id: null,
      baseQuantity: null,
      brand: null,
      category: null,
      code: null,
      createDate: null,
      description: null,
      name: null,
      privatePrice: null,
      publicPrice: null,
      stock: null,
      updateDate: null,
    };
  }

  //componente de busqueda de producto por conincidencia
  selectEvent(item) {
    // do something with selected item
    this.productRequest = item;
    this.addProductInTable(this.productRequest);
    this.productsByName$ = null;
  }


  onChangeSearch(name: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.productsByName$ = this.productService.findByName(name);
    console.log(this.productsByName$);
  }

  onFocused(e){
    // do something when input is focused
  }


}
