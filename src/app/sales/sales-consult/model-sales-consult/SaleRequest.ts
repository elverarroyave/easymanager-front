import { ProductDetailRequest } from "./ProductDetailRequest";

export class SaleRequest{
  id: number;
  createDate: string;
  updateDate: string;
  productsDetail: Array<ProductDetailRequest>;
  userId: number


  constructor(){
    this.id=0
    this.createDate=""
    this.updateDate=""
    this.productsDetail=[]
    this.userId;
  }
}

