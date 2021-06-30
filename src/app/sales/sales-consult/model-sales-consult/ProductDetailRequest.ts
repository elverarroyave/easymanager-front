import { ProductRequest } from "src/app/model/ProductRequest";

export class ProductDetailRequest{
  id: number
  amount: number;
  price: number
  product: ProductRequest
}