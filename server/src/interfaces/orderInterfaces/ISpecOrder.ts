export interface ISpecOrder {
  user: number
  totalAmount: number
  orderTime: Date
}

export const isISpecOrder = (obj: any): obj is ISpecOrder => {
  return (
    obj && ( obj.user !== undefined || obj.totalAmount !== undefined || obj.orderTime !== undefined )
  ) 
}