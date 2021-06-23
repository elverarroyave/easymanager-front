export class Product{

  baseQuantity: number;
  brand: string;
  category: string;
  code: string;
  description: string;
  name: string;
  privatePrice: number;
  publicPrice: number;
  stock: number;


  constructor(
    baseQuantity: number,
    brand: string,
    category: string,
    code: string,
    description: string,
    name: string,
    privatePrice: number,
    publicPrice: number,
    stock: number
  ){
    this.baseQuantity=baseQuantity;
    this.brand=brand;
    this.category=category;
    this.code=code;
    this.description=description;
    this.name=name;
    this.privatePrice=privatePrice;
    this.publicPrice=publicPrice;
    this.stock=stock;
  }
}