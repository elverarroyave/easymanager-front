import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductRequest } from 'src/app/model/ProductRequest';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: ProductRequest = new ProductRequest();
  formProductDetail: FormGroup;

  editable: boolean = false;

  constructor(
    private fb:FormBuilder,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id);
    this.productService.findById(id).subscribe(data=>{
      this.product = data.content[0] as ProductRequest;
      this.uploadDates();
    }, err =>{
      console.log(err)
    })


    //Crear Formulario
    this.formProductDetail = this.fb.group({

      name:['', Validators.required],
      code:['', Validators.required],
      brand:[''],
      category:[''],
      description:[''],
      publicPrice:['', Validators.required],
      privatePrice:['', Validators.required],
      baseQuantity:['', Validators.required],
      stock:['', Validators.required],
      createdDate:[''],
      updatedDate:['']
    })

    this.formProductDetail.disable();
  }

  private uploadDates(){
    //Rellenar formulario
    this.formProductDetail.setValue({
      name: this.product.name,
      code: this.product.code,
      brand: this.product.brand,
      category: this.product.category,
      description: this.product.description,
      publicPrice: this.product.publicPrice,
      privatePrice: this.product.privatePrice,
      baseQuantity: this.product.baseQuantity,
      stock: this.product.stock,
      createdDate: this.dateFormat(this.product.createDate.toString()),
      updatedDate: this.dateFormat(this.product.updateDate.toString())
    })
  }


  private dateFormat(date: string): string{
    let dateFormat = new Date(
      parseInt(date.substring(0,4)),
      parseInt(date.substring(5,7)),
      parseInt(date.substring(8,10)),
      parseInt(date.substring(11,13)),
      parseInt(date.substring(14,16)),
      parseInt(date.substring(17,19))
    )
    return dateFormat.toString();
  }

  isEditable(){
    this.editable=true;
    this.formProductDetail.enable();
  }

  noEditable(){
    this.editable=false;
    this.formProductDetail.disable();
  }

  updateProduct(){
    const id: number = parseInt(this.activatedRoute.snapshot.params.id);
    let productToEdit = new Product(
      parseInt(this.formProductDetail.value.baseQuantity),
      this.formProductDetail.value.brand,
      this.formProductDetail.value.category,
      this.formProductDetail.value.code,
      this.formProductDetail.value.description,
      this.formProductDetail.value.name,
      parseFloat(this.formProductDetail.value.privatePrice),
      parseFloat(this.formProductDetail.value.publicPrice),
      parseInt(this.formProductDetail.value.stock)
    );
    this.productService.updateProduct(id, productToEdit).subscribe(data=>{
      this.alert.successAlet(`¡Producto Editado!`,`${productToEdit.name} editado Correctamente.`)
    },err =>{
      if(err.error.errors != undefined){
        this.alert.infoAlet(`Error al agregar el producto!`,`${err.error.errors[0].defaultMessage}`)
      }else(
        this.alert.infoAlet(`Error al agregar el producto!`,`${err.error}`)
      )
    })
  }

  deleteProduct(){
    const id: number = parseInt(this.activatedRoute.snapshot.params.id);

    Swal.fire({
      title: `¿Eliminar ${this.product.name}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success')
  
        this.productService.deleteProdcut(id).subscribe(data=>{
          this.alert.infoAlet('¡Producto Eliminar!', `${this.product.name}, eliminado correctamente.`)
        },err=>{
          this.alert.errorAlert('Error :/',`Hay un error para eliminar el producto, ${this.product.name}.`)
        })
        
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info')
      }
    })
  }

}
