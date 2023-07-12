export interface ISpecCartItems {
  user?: number
  cart?: number
  cake: number
  quantity: number
}

export const isISpecCartItems = (obj: any): obj is ISpecCartItems => {
  return (
    obj && (obj.cart !== undefined || obj.cake !== undefined || obj.quantity !== undefined)
  );
};