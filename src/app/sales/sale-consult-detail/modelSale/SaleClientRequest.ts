export class SaleClientRequest{
  id: number;
  document: string;
  name: string;
  lastName: string;
  numberPhone: string;
  address: string;

  constructor(){
    this.id=0;
    this.document="";
    this.name="";
    this.lastName="";
    this.numberPhone="";
    this.address="";
  }
}