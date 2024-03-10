export interface Product{
  baseQuantity: number;
  brand: string;
  category: string;
  code: string;
  description: string;
  name: string;
  privatePrice: number;
  publicPrice: number;
  stock?: number;
}
