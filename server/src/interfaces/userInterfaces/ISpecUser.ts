export default interface ISpecUser {
  fullName: string
  email: string
  phoneNumber: string
}

export const isISpecUser = (obj: any): obj is ISpecUser => {
  return (
    obj && (obj.fullName !== undefined || obj.email !== undefined || obj.phoneNumber !== undefined)
  );
};