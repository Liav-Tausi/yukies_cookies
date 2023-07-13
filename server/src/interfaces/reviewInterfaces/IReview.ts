export interface IReview {
  user: number
  cake: number
  rating: number
  comment: string 
}

export const isIReview = (obj: any): obj is IReview => {
  return obj && obj.user && obj.cake && obj.rating && obj.comment 
}