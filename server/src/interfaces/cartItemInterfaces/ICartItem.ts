export interface ICartItem {
  user?: number
  cart?: number
  cake: number
  quantity: number
}


export const isICartItem = (obj: any): obj is ICartItem => {
  return (
    obj && (obj.cart !== undefined || obj.cake !== undefined || obj.quantity !== undefined)
  );
};