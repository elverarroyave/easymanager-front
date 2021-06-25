export class Tools{
  public dateFormat(date: string): string {
    let dateFormat = new Date(
      parseInt(date.substring(0, 4)),
      parseInt(date.substring(5, 7)),
      parseInt(date.substring(8, 10)),
      parseInt(date.substring(11, 13)),
      parseInt(date.substring(14, 16)),
      parseInt(date.substring(17, 19))
    );
    return dateFormat.toString();
  }
}