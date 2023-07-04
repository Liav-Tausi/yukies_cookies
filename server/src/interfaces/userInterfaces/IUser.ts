export default interface IUser {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  isStaff: boolean
  id: number
  createdAt: Date
  updatedAt: Date
}

export const isIUser = (value: any): value is IUser => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const requiredProperties: Array<keyof IUser> = [
    'fullName',
    'email',
    'phoneNumber',
    'password',
    'isStaff',
    'id',
    'createdAt',
    'updatedAt',
  ];
  return requiredProperties.every((property) =>
    Object.prototype.hasOwnProperty.call(value, property)
  );
};

