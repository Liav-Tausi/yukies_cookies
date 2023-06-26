export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  isStaff: boolean;
  dateJoined: Date;
}