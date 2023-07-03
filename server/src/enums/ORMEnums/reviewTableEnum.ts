export enum reviewTableEnum {
  Review = 'Review',
  LongDescription = 'Long Description',
}

export enum reviewTableEnumMSG {
  Invalid = 'invalid',
  IsRequired = 'is required.',
  MustBeBetWeen1_600 = 'must be between 1 and 600 characters long.',
  Min = 'must be greater than or equal to',
  Max = 'must be less than or equal to',
}

export enum reviewTableEnumConfig {
  MinCommentLength = 1,
  MaxCommentLength = 600,
  MinRating = 1,
  MaxRating = 5
}