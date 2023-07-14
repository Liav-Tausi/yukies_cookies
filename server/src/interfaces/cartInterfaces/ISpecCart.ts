export interface ISpecCart {
  id?: number
  user?: number
}

export const isISpecCart = (obj: any): obj is ISpecCart => {
  return (
    obj && (obj.user_id !== undefined )
  );
};