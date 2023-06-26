export enum regexValidations {
  UserPassword = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i',
  PhoneNumber = '/^(?:\+972|0)(?:-|\s)?(?:\d{1})?(?:-|\s)?(?:\d{3})?(?:-|\s)?(?:\d{3})?(?:-|\s)?(?:\d{2})?(?:-|\s)?(?:\d{2})?$/',
  FullName = '/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/',
}