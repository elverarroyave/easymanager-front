import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  formProduct: UntypedFormGroup;
  

  constructor(
    private fb: UntypedFormBuilder,
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
      let product: Product = {
        baseQuantity:parseInt(this.formProduct.value.baseQuantity),
        brand:this.formProduct.value.brand,
        category:this.formProduct.value.category,
        code:this.formProduct.value.code,
        description:this.formProduct.value.description,
        name:this.formProduct.value.name,
        privatePrice:parseFloat(this.formProduct.value.privatePrice),
        publicPrice:parseFloat(this.formProduct.value.publicPrice),
        stock:parseInt(this.formProduct.value.stock)
      }

      console.log(product)

      this.productService.saveProduct(product).subscribe(data=>{
        console.log(data)
        this.alert.successAlet(`¡Producto Agregado!`,`${product.name} agregado satisfactoriamente. Ahora lo puedes ver en tu lista de productos.`)
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
