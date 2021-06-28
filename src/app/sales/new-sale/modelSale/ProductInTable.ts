export class ProductInTable{
  code: string;
  name: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;

  constructor(
    code: string,
    name: string,
    amount: number,
    unitPrice: number,
    totalPrice: number,
  ){
    this.code=code;
    this.name=name;
    this.amount=amount;
    this.unitPrice=unitPrice;
    this.totalPrice=totalPrice;
  }
}