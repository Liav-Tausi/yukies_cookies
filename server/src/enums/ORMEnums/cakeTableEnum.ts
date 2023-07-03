export enum cakeTableEnum {
  Name = 'Name',
  ShortDescription = 'Short Description',
  LongDescription = 'Long Description',
  Price = 'Price',
}

export enum cakeTableEnumMSG {
  Invalid = 'invalid',
  IsRequired = 'is required.',
  MustBeBetWeen1_100 = 'must be between 1 and 100 characters long.',
  MustBeBetWeen1_600 = 'must be between 1 and 600 characters long.',
  Max = 'must be less than or equal to',
  Min = 'must be greater than or equal to',
}

export enum cakeTableEnumConfig {
  MinLengthName = 1,
  MaxLengthName = 20,
  MinLengthShortDescription = 1,
  MaxLengthShortDescription = 150,
  MinLengthLongDescription = 1,
  MaxLengthLongDescription = 600,
  MinPrice = 0,
  MaxPrice = 99999
}