export interface IOrderItems {
  order: number
  cake: number
  quantity: number
  totalAmount: number
  price: number
}

export const isIOrderItems = (obj: any): obj is IOrderItems => {
  return obj && obj.order && obj.cake && obj.quantity && obj.price && obj.totalAmount
}