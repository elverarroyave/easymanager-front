import { SaleClientRequest } from "./SaleClientRequest";
import { SaleUserRequest } from "./SaleUserResponse";

export class SaleRequest{
  createDate: string;
  id: number
  productsDetail: Array<any>;
  updateDate: string;
  client: SaleClientRequest;
  user: SaleUserRequest;
  total: number;
  subtotal: number;
  interestRate: number;
  paymentMethod: string;
  paymentAmount: number;
  constructor(){
    this.createDate="";
    this.id=0;
    this.productsDetail=[];
    this.updateDate="";
    this.client= new SaleClientRequest();
    this.user= new SaleUserRequest();
  }
}
