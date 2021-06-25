export class ShoppingInTable{
  idCompra: number;
  dateShopping: string;
  quantityProducts: number;
  total: number;

  constructor(
    idCompra: number,
    dateShopping: string,
    quantityProducts: number,
    total: number
  ){
    this.idCompra=idCompra;
    this.dateShopping=dateShopping;
    this.quantityProducts=quantityProducts;
    this.total=total;
  }
}