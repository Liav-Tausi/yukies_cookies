export interface ISpacCake {
    name?: string
    shortDescription?: string
    longDescription?: string
    price?: number
    imageUrl?: string
}

export const isISpacCake = (obj: any): obj is ISpacCake => {
  return (
    obj &&
    (obj.name !== undefined ||
      obj.shortDescription !== undefined ||
      obj.longDescription !== undefined ||
      obj.price !== undefined ||
      obj.imageUrl !== undefined)
  );
};