export class ProductRequest{
  
  id: number;
  baseQuantity: number;
  brand: string;
  category: string;
  code: string;
  createDate: Date;
  description: string;
  name: string;
  privatePrice: number;
  publicPrice: number;
  stock: number;
  updateDate: Date;

  constructor(
  ){
    this.id=0;
    this.baseQuantity=0;
    this.brand='';
    this.category='';
    this.code='';
    this.createDate= new Date;
    this.description='';
    this.name='';
    this.privatePrice=0;
    this.publicPrice=0;
    this.stock=0;
    this.updateDate= new Date;
 
  }
}