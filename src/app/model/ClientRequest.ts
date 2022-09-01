export interface ClientRequest{
  id: number;
  name: string;
  lastName: string;
  email: string;
  address: string;
  numPhone: string;
  numDocument: string;
  createDate?: string;
  updateDate?: string;
  link ?: Array<any>;

}
