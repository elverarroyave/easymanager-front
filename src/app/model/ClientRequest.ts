export class ClientRequest{
  id: number;
  name: string;
  lastName: string;
  email: string;
  address: string;
  numPhone: string;
  numDocument: string;
  createDate: string;
  updateDate: string;
  link: Array<any>;

  constructor(){
    this.id=0
    this.name=''
    this.lastName=''
    this.email=''
    this.address=''
    this.numPhone=''
    this.numDocument=''
    this.createDate=''
    this.updateDate=''
    this.link=[]
  }
}