import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientRequest} from 'src/app/model/ClientRequest';
import {ProductRequest} from 'src/app/model/ProductRequest';
import {AlertService} from 'src/app/services/alert.service';
import {ClientsService} from 'src/app/services/clients.service';
import {ProductsService} from 'src/app/services/products.service';
import {SaleService} from 'src/app/services/sale.service';
import {Tools} from 'src/app/tools/Tools';
import Swal from 'sweetalert2';
import {ProductInTable} from './modelSale/ProductInTable';
import {ProductoResponse} from './modelSale/ProductResponse';
import {SaleSaveRequest} from "./modelSale/saleSaveRequest";
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { MasterServiceService } from 'src/app/services/master-service.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
  providers: [ProductsService]
})
export class NewSaleComponent implements OnInit {

  @ViewChild('inputFindByCode') inputFindByCode: ElementRef;
  @ViewChild('inputFindByClient') inputFindClient: ElementRef;
  //Formularios
  formGroupClient: UntypedFormGroup;
  formGroupProduct: UntypedFormGroup;
  formGroupSale: UntypedFormGroup;

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

  //subtotal
  subTotal: number = 0;

  //interest
  interest: number = 0;

  //FirstPayValue
  firstPayValue: number = 0;

  //Herramienta
  tools: Tools = new Tools();

  //Variables de consulta producto por nombre
  productsByName: any[];

  clientsByCoincidence: any[] = [];

  productName: string = 'name';

  paymentMethods: any[];

  creditTerms: any[] = [];

  interestRate: number;


  constructor(
    private clientsService: ClientsService,
    private productService: ProductsService,
    private saleService: SaleService,
    private paymentMethodService: PaymentMethodService,
    private fb: UntypedFormBuilder,
    private alert: AlertService,
    private masterService: MasterServiceService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date().toString();

    //Cargamos los formularios
    this.formClient();
    this.formProduct();
    this.formSale();

    this.initClientRequest();
    this.initProductRequest();

    this.isActiveBtnShopping = false;
    this.loadMasters();
  }

  ngAfterViewInit(){
    setTimeout(() => this.inputFindClient.nativeElement.focus());
  }

  private loadMasters(){
    this.loadCreditTerms();
    this.loadPaymentMethods();
    this.loadInterestRate();
  }

  initClientRequest(){
    this.clientRequest = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      address: '',
      numPhone: '',
      numDocument: '',
    }
  }

  initProductRequest(){
    this.productRequest = {
      id: 0,
      baseQuantity: 0,
      brand: '',
      category: '',
      code: '',
      description: '',
      name: '',
      publicPrice: 0,
      stock: 0
    }
  }

  loadCreditTerms(){
    this.masterService.getMasterData('MONTHLY_PAYMENT_OPTIONS').subscribe(data => {
      this.creditTerms = data;
    }, error => {
      this.alert.errorAlert('Error al cargar las opciones de pago', error.error);
    });
  }

  loadInterestRate(){
    this.masterService.getMasterData('CURRENT_MONTHLY_INTEREST').subscribe(data => {
      this.interestRate = data[0]?.value;
    }, error => {
      this.alert.errorAlert('Error al cargar la tasa de interes', error.error);
    });
  }

  ngDoCheck() {
    //ActiveBtnShopping
    this.isActiveBtnShopping =
      this.productsInTable.length != 0 && this.clientRequest.id != 0 && this.formGroupSale.valid;
  }

  //formulario de cliente
  private formClient() {
    this.formGroupClient = this.fb.group({
      document: ['', Validators.required],
    });
  }

  private formProduct() {
    this.formGroupProduct = this.fb.group({
      code: [''],
      name: ['']
    });
  }

  private formSale(): void{
    this.formGroupSale = this.fb.group({
      isCredit: [false, Validators.required],
      paymentMethod: [1,Validators.required],
      paymentAmount: ["1", Validators.required],
    })
  }

  loadClient(client: any){
    this.clientRequest = client;
  }

  loadProduct(productCode?: string) {
    const code = this.formGroupProduct.value.code || productCode;
    this.productService.findByCode(code).subscribe(
      (data) => {
        this.setProductRequest(data);
        this.formGroupProduct.reset();
        this.addProductInTable(this.productRequest);
      },
      (err) => {
        this.alert.infoAlet('Opss', `${err.error}`);
      }
    );
  }

  onChangeSearchClient(event: any) {
    const input = event.target.value;
    if(event.key==='Enter'){
      this.clientRequest = this.clientsByCoincidence.find((client) => client.numDocument == input);
      if(this.clientRequest){
        this.clientsByCoincidence.length = 0;
        this.inputFindByCode.nativeElement.focus();
      }else{
        this.initClientRequest();
        this.alert.infoAlet('Cliente no encontrado', 'No se encontró ningun cliente con el documento ingresdo');
      }
      return;
    }
    // if (input.length < 3) return;
    this.clientsService.findByCoincidence(input).subscribe(data =>{
      this.clientsByCoincidence = data.content;
    }, error => {
    });
  }

  pressEnterClient(client: any){
    console.log(client);
  }

  loadPaymentMethods(){
    this.paymentMethodService.getAllPaymentMethods().subscribe(data => {
      this.paymentMethods = data;
    }, error => {
      this.alert.errorAlert('Error al cargar los metodos de pago', error.error);

    });
  }

  private setProductRequest(data: any) {
    this.productRequest.id = data.product.id;
    this.productRequest.baseQuantity = data.baseStock;
    this.productRequest.brand = data.product.brand;
    this.productRequest.category = data.product.category;
    this.productRequest.code = data.product.code;
    this.productRequest.description = data.product.description;
    this.productRequest.name = data.product.name;
    this.productRequest.publicPrice = data.product.price;
    this.productRequest.stock = data.stock;
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
    this.saleService
      .createSale(this.buildSale())
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

  private buildSale(): SaleSaveRequest{
    this.productsResponse.length = 0;
    this.productsInTable.forEach((productInTable) => {
      let productResponse: ProductoResponse = {
        code: productInTable.code,
        quantity: productInTable.amount
      };
      this.productsResponse.push(productResponse);
    });
    console.log('this.formGroupClient.value-->', this.formGroupClient.value.document);
    return {
      clientNumDocument: this.formGroupClient.value.document.numDocument,
      isCredit: this.formGroupSale.value.isCredit,
      paymentAmount: parseInt(this.formGroupSale.value.paymentAmount),
      paymentMethod: this.formGroupSale.value.paymentMethod,
      firstPayment: this.firstPayValue,
      items: this.productsResponse
    };
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
    this.subTotal = 0;
    this.productsInTable.forEach((p) => (this.subTotal += p.totalPrice));
    this.calulateInterest();
    this.totalSalePrice = this.subTotal + this.interest;
    this.firstPayValue = this.totalSalePrice/(parseInt(this.formGroupSale.value.paymentAmount)+1);
  }

  calulateInterest(){
    if(this.formGroupSale.get('isCredit').value){
      this.interest = this.subTotal * this.interestRate * parseInt(this.formGroupSale.value.paymentAmount);
    }else{
        this.interest = 0;
    }
  }

  showProduct(product : any){
    return product ? product.name : '';
  }

  showClient(client: any){
    return client ? client.numDocument : '';
  }


  private resetForm(){
    this.productsInTable.length = 0;
    this.subTotal=0;
    this.formGroupClient.reset();
    this.formGroupProduct.reset();
    this.formGroupSale.reset();

    this.initClientRequest();
    this.initProductRequest();

    this.updateTotal();
  }

  onChangeSearch(event: any) {
    const name = event.target.value;
    if(event.key==='Enter'){
      let producttSelected = this.productsByName.find((product) => product.name == name);
      if(producttSelected){
        this.loadProduct(producttSelected.code);
        this.productsByName.length = 0;
        //todo focus in check
      }else{
        this.initProductRequest();
        this.alert.infoAlet('Producto no encontrado', 'No se encontró ningun producto con el nombre ingresado');
      }
      return;
    }
    // if (name.length < 3) return;
    this.productService.findByName(name).subscribe(data =>{
      this.productsByName = data;
    }, error => {
      console.log("No se encontró informacion con la coincidencia ", name)
    });
  }



}
