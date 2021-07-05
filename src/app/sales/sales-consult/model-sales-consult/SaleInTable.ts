export class SaleInTable{
  id: number;
  createDate: string;
  userDocument: string;
  clientDocument : string;
  amount: number;
  total: number;

  constructor(
    id: number,
    createDate: string,
    userDocument: string,
    clientDocument: string,
    amount: number,
    total: number
  ){
    this.id=id;
    this.createDate=createDate;
    this.userDocument=userDocument;
    this.clientDocument=clientDocument;
    this.amount=amount;
    this.total=total;
  }
}