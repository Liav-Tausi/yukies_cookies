export interface ISpecCart {
  user?: number
}

export const isISpecCart = (obj: any): obj is ISpecCart => {
  return (
    obj && (obj.user_id !== undefined )
  );
};