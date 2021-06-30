import { ProductDetailRequest } from "./ProductDetailRequest";

export class SaleRequest{
  id: number;
  createDate: string;
  updateDate: string;
  productsDetail: Array<ProductDetailRequest>;
  user: any


  constructor(){
    this.id=0
    this.createDate=""
    this.updateDate=""
    this.productsDetail=[]
    this.user=undefined;
  }
}

