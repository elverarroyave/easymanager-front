export class ClientRequestShopping{
  id: number;
  createDate: string;
  updateDate: string;
  productsDetail: Array<any>
  user: any;

  constructor(){
    this.id=0
    this.createDate=""
    this.updateDate=""
    this.productsDetail = new Array<any>();
    this.user= undefined;
  }
}