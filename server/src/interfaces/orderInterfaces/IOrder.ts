export interface IOrder {
  user: number
  totalAmount: number
  orderTime: Date
}

export const isIOrder = (obj: any): obj is IOrder => {
  return obj && obj.user && obj.totalAmount && obj.orderTime
}