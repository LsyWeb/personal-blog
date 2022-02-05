export  type dataType = {
  code:number,
  msg:string,
  data:({
    total:number,
    rows:Array<any>,
  })|null,
}