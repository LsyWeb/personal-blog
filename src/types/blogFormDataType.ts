export type blogFormDataType = {
  title: string;
  description: string;
  content: string;
  thumb: string;
  scanNumber: number;
  commentNumber: number;
  categoryId:number;
  category?:{
    name:string
  }
};