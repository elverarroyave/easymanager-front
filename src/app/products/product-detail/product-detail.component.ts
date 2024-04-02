import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  formProductDetail: UntypedFormGroup;
  inventory: any = {};

  editable: boolean = false;
  priceValue: number;
  categories: Array<any> = [];

  constructor(
    private fb:UntypedFormBuilder,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private categoryService: CategoryService,
    private inventoryService: InventoryService
  ) {
  }

  ngOnInit(): void{
    this.loadForm();
    const id: number = parseInt(this.activatedRoute.snapshot.params.id);
    this.inventoryService.getInventoryById(id).subscribe(data=>{
      this.inventory = data;
      this.product = this.inventory.product;
      this.product.category = this.inventory.product.category?.id;
      this.priceValue = this.product.price;
      this.getCategories();
      this.uploadDates();
    },err=>{
      console.log(err)
    })
  }

  loadForm(){
    //Crear Formulario
    this.formProductDetail = this.fb.group({
      name:['', Validators.required],
      code:['', Validators.required],
      model:[''],
      brand:['', Validators.required],
      category:['', Validators.required],
      price:[100, [Validators.required, Validators.min(100)]],
      description:[''],
      amountMountWarranty:[0, Validators.min(0)],
      weight:[0],
      height:[0, Validators.min(0)],
      width:[0, Validators.min(0)],
      depth:[0, Validators.min(0)],
      voltage:[0],
      color:[''],
      stock:[0],
      baseStock:[0],
      createdDate:[''],
      updatedDate:['']
    })
    this.formProductDetail.disable();
  }

  getCategories(){
    this.categoryService.getAllCatetories().subscribe(data=>{
      this.categories = data;
    },err=>{
      console.log(err)
    })
  }

  private uploadDates(){
    this.formProductDetail.patchValue({
      name: this.product.name,
      code:this.product.code,
      model: this.product.model,
      brand: this.product.brand,
      category: this.product.category,
      price: this.product.price,
      description: this.product.description,
      amountMountWarranty: this.product.amountMountWarranty,
      weight: this.product.weight,
      height: this.product.height,
      width: this.product.width,
      depth: this.product.depth,
      voltage: this.product.voltage,
      color: this.product.color,
      stock: this.inventory.stock,
      baseStock: this.inventory.baseStock,
      createdDate: this.inventory.createDate,
      updatedDate: this.inventory.updateDate
    });
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
    const id: number = this.product.id;
    let productToEdit: Product = {
      name: this.formProductDetail.get('name').value,
      code: this.formProductDetail.get('code').value,
      model: this.formProductDetail.get('model').value,
      brand: this.formProductDetail.get('brand').value,
      description: this.formProductDetail.get('description').value,
      category: this.formProductDetail.get('category').value,
      amountMountWarranty: this.formProductDetail.get('amountMountWarranty').value,
      price: this.formProductDetail.get('price').value,
      weight: this.formProductDetail.get('weight').value,
      height: this.formProductDetail.get('height').value,
      width: this.formProductDetail.get('width').value,
      depth: this.formProductDetail.get('depth').value,
      voltage: this.formProductDetail.get('voltage').value,
      color: this.formProductDetail.get('color').value,
    };
    console.log('productToEdit-->', productToEdit);
    this.productService.updateProduct(id, productToEdit).subscribe(data=>{
      this.alert.successAlet(`¡Producto Editado!`,`${productToEdit.name} editado Correctamente.`)
      this.noEditable();
    },err =>{
      if(err.error.errors != undefined){
        this.alert.infoAlet(`Error al agregar el producto!`,`${err.error.errors[0].defaultMessage}`)
      }else(
        this.alert.infoAlet(`Error al agregar el producto!`,`${err.error}`)
      )
    })
  }

  deleteProduct(){
    const id: number = this.product.id

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
