export interface IFavorite {
  user: number
  cake: number
}


export const isIFavorite = (obj: any): obj is IFavorite => {
  return obj && obj.user && obj.cake 
}