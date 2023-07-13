export interface ISpecReview {
  user?: number
  cake?: number
  rating?: number
  comment?: string 
}

export const isISpecReview = (obj: any): obj is ISpecReview => {
  return obj && (obj.user !== undefined || obj.cake !== undefined || obj.rating !== undefined || obj.comment !== undefined)
}