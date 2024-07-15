import {ProductoResponse} from "./ProductResponse";

export interface SaleSaveRequest{
  clientNumDocument: string;
  isCredit: boolean;
  paymentAmount: number;
  paymentMethod: number;
  firstPayment: number;
  items : Array<ProductoResponse>;
}
