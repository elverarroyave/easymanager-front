import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  //Variables
  formProduct: UntypedFormGroup;
  categories: Array<any> = [];


  constructor(
    private fb: UntypedFormBuilder,
    private productService: ProductsService,
    private ruta: Router,
    private alert: AlertService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    //Get Categories
    this.getCategories();

    this.formProduct = this.fb.group({
      name:['', Validators.required],
      code:['', Validators.required],
      model:[''],
      brand:['', Validators.required],
      category:['', Validators.required],
      description:[''],
      amountMountWarranty:[0, Validators.min(0)],
      weight:[0],
      heigh:[0, Validators.min(0)],
      width:[0, Validators.min(0)],
      depth:[0, Validators.min(0)],
      voltage:[0],
      color:['']
    })

  }

  getCategories(){
    this.categoryService.getAllCatetories().subscribe(data=>{
      this.categories = data;
    },err=>{
      console.log(err)
    })
  }

  addProduct(){
    console.log('formProduct-->', this.formProduct);
    console.log('isValidForm-->', this.formProduct.valid);
    let product: Product = {
      brand:this.formProduct.value.brand,
      category:this.formProduct.value.category,
      code:this.formProduct.value.code,
      model:this.formProduct.value.model,
      description:this.formProduct.value.description,
      name:this.formProduct.value.name,
      amountMountWarranty:this.formProduct.value.amountMountWarranty,
      heigh:this.formProduct.value.heigh,
      width:this.formProduct.value.width,
      depth:this.formProduct.value.depth,
      voltage:this.formProduct.value.voltage,
      color:this.formProduct.value.color,
      weight:this.formProduct.value.weight
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
