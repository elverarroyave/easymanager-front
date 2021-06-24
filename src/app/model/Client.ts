export class Client{
  name: string;
  lastName: string;
  email: string;
  address: string;
  numPhone: string;
  numDocument: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    document: string
  ){
    this.name=name;
    this.lastName=lastName;
    this.email=email;
    this.address=address;
    this.numPhone=phone;
    this.numDocument=document;
  }
}