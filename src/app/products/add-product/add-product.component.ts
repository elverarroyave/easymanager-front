import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  //Variables
  formProduct: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private ruta: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

    this.formProduct = this.fb.group({
      name:['', Validators.required],
      code:['', Validators.required],
      brand:[''],
      category:[''],
      description:[''],
      publicPrice:['', Validators.required],
      privatePrice:['', Validators.required],
      baseQuantity:['', Validators.required],
      stock:['', Validators.required]
    })

  }

  addProduct(){
    if(this.formProduct.valid){
      let product: Product = new Product(
        parseInt(this.formProduct.value.baseQuantity),
        this.formProduct.value.brand,
        this.formProduct.value.category,
        this.formProduct.value.code,
        this.formProduct.value.description,
        this.formProduct.value.name,
        parseFloat(this.formProduct.value.privatePrice),
        parseFloat(this.formProduct.value.publicPrice),
        parseInt(this.formProduct.value.stock)
      )

      console.log(product)

      this.productService.saveProduct(product).subscribe(data=>{
        console.log(data)
        this.alert.successAlet(`¡Producto Agregado!`,`${product.name} agregado satisfactoriamente. ahora lo puedes ver en tu lista de productos`)
        this.ruta.navigateByUrl('/products/list-products');
        this.formProduct.reset();
      },err =>{
        console.log(err);
        if(err.error.errors != undefined){
          this.alert.infoAlet(`Error al agregar el producto!`,`${err.error.errors[0].defaultMessage}`)
        }else(
          this.alert.infoAlet(`Error al agregar el producto!`,`${err.error}`)
        )
        
      })
      
    }
   
  }

}
