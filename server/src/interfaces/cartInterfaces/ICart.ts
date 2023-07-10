export interface ICart {
  user: number
}

export const isICart = (obj: any): obj is ICart => {
  return obj && obj.user;
}