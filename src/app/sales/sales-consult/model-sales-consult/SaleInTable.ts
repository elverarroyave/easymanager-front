export class SaleInTable{
  id: number;
  createDate: string;
  user: string;
  amount: number;
  total: number;

  constructor(
    id: number,
    createDate: string,
    user: string,
    amount: number,
    total: number
  ){
    this.id=id;
    this.createDate=createDate;
    this.user=user;
    this.amount=amount;
    this.total=total;
  }
}