import { Product } from "./Product";

export interface Inventory{
  id: number;
  product: Product;
  stock: number;
  baseStock: number;
  price: number;
  createdDate: Date;
  updatedDate: Date;

}
