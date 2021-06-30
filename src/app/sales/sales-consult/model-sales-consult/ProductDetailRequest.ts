import { ProductRequest } from "src/app/model/ProductRequest";

export class ProductDetailRequest{
  id: number
  amount: number;
  publicPriceProduct: number
  totalSale: number;
  nameProduct: string;
  codeProdcuct: string;
}