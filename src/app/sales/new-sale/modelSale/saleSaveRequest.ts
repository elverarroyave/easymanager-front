import {ProductoResponse} from "./ProductResponse";

export interface SaleSaveRequest{
  clientNumDocument: string;
  isCredit: boolean;
  paymentAmount: number;
  paymentMethod: number;
  items : Array<ProductoResponse>;
}
