export enum userTableEnum {
  Username = 'Username',
  Email = 'Email',
  FullName = 'Full name',
  phoneNumber = 'Phone Number',
  Password = 'Password',
  Staff = 'Staff',
}

export enum userTableEnumMSG {
  Invalid = 'invalid',
  IsRequired = 'is required.',
  MustBeBetWeen1_100 = 'must be between 1 and 100 characters long.',
  PhoneNumber = 'Israeli phone number.',
  EmailFormat = 'email format.',
  ValidPassword = 'must be at least 8 characters long and contain at least one upper and one lower case letters and two digits.',
  Staff = 'Staff',
}

export enum userTableEnumConfig {
  MinLengthPassword = 8,
  MinLowercasePassword = 1,
  MinUppercasePassword = 1,
  MinNumbersPassword = 2,
  MinSymbolsPassword = 0
}