import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
})
export class NewSaleComponent implements OnInit {
  //Formularios
  formGroupClient: FormGroup;
  formGroupProduct: FormGroup;

  //Modelos
  clientRequest: ClientRequest = new ClientRequest();
  productRequest: ProductRequest = new ProductRequest();

  //Fecha
  currentDate: string;

  //Modelo de producto en tabla
  productsInTable: Array<ProductInTable> = new Array<ProductInTable>();

  //ProductoResponse
  productsResponse: Array<ProductoResponse> = new Array<ProductoResponse>();

  //Desactivar boton realizar compra
  isActiveBtnShopping: boolean = false;

  //Total price shopping
  totalSalePrice: number = 0;

  //Herramienta
  tools: Tools = new Tools();

  constructor(
    private clientsService: ClientsService,
    private productService: ProductsService,
    private saleService: SaleService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date().toString();

    //Cargamos los formularios
    this.formClient();
    this.formProduct();
  }

  ngDoCheck() {
    //ActiveBtnShopping
    this.isActiveBtnShopping =
      this.productsInTable.length != 0 && this.clientRequest.id != 0;
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
      let productInTable = new ProductInTable(
        product.code,
        product.name,
        1,
        product.publicPrice,
        product.publicPrice
      );
      this.productsInTable.push(productInTable);
    }
    this.updateTotal();
    this.productsInTable.reverse();
  }

  playShopping() {
    Swal.fire({
      title: '¿Realizar compra?',
      confirmButtonText: `Vender`,
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createShopping();
        Swal.fire('Compra Realizada!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Compra cancelada', '', 'warning');
      }
    });
  }

  private createShopping() {
    this.productsResponse.length = 0;
    this.productsInTable.forEach((productInTable) => {
      let productResponse: ProductoResponse = new ProductoResponse(
        productInTable.code,
        productInTable.amount
      );
      this.productsResponse.push(productResponse);
    });

    this.saleService
      .createSale(this.clientRequest.numDocument, this.productsResponse)
      .subscribe(
        (data) => {
          this.alert.successAlet('Venta exitosa!', '');
          this.productsInTable.length = 0;
          this.clientRequest = new ClientRequest();
          this.productRequest = new ProductRequest();
          this.totalSalePrice=0;
          this.formGroupClient.reset();
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
}
