export interface Product{
  id?: number,
  name: string;
  code: string;
  model: string;
  brand: string;
  description: string;
  category: number;
  amountMountWarranty: number;
  price: number;
  weight: number;
  height: number;
  width: number;
  depth: number;
  voltage: number;
  color: string;
  createdDate?: Date;
  updatedDate?: Date;
}
