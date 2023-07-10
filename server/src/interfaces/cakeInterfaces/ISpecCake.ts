export interface ISpecCake {
    name?: string
    shortDescription?: string
    longDescription?: string
    price?: number
    imageUrl?: string
}

export const isISpecCake = (obj: any): obj is ISpecCake => {
  return (
    obj &&
    (obj.name !== undefined ||
      obj.shortDescription !== undefined ||
      obj.longDescription !== undefined ||
      obj.price !== undefined ||
      obj.imageUrl !== undefined)
  );
};