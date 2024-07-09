import {ProductoResponse} from "./ProductResponse";

export interface SaleSaveRequest{
  clientNumDocument: String;
  isCredit: boolean;
  paymentAmount: number;
  items : Array<ProductoResponse>;
}
