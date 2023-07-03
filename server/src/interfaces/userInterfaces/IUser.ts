export default interface IUser {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  isStaff: boolean
}

export const isIUser = (value: any): value is IUser => {
  return typeof value === 'object' && value !== null && 'username' in value;
}
