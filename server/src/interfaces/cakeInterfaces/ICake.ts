export interface ICake {
    name: string
    shortDescription: string
    longDescription: string
    price: number
    imageUrl: string
}

export const isICake = (obj: any): obj is ICake => {
  return obj && obj.name && obj.shortDescription && obj.longDescription && obj.price;
}