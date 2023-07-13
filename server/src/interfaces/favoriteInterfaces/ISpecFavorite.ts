export interface ISpecFavorite {
  user?: number
  cake?: number
}

export const isISpecFavorite = (obj: any): obj is ISpecFavorite => {
  return (
    obj && ( obj.user !== undefined || obj.cake !== undefined )
  )
};