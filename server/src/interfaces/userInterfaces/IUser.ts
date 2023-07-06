export default interface IUser {
  fullName: string
  email: string
  address: string
  phoneNumber: string
  password: string
  isStaff: boolean
  id: number
  createdAt: Date
  updatedAt: Date
}

export const isIUser = (obj: any): obj is IUser => {
  return obj && obj.fullName && obj.email && obj.phoneNumber && obj.password;
}

