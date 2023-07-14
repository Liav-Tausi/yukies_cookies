export interface ISpecOrderItems {
  order?: number
  cake?: number
  quantity?: number
  totalAmount?: number
  price?: number
}


export const isISpecOrderItems = (obj: any): obj is ISpecOrderItems => {
  return (
    obj && ( obj.order !== undefined || obj.cake !== undefined ||
       obj.quantity !== undefined || obj.price !== undefined || obj.totalAmount !== undefined)
  ) 
}