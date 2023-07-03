export enum orderItemsTableEnum {
  OrderItem = 'OrderItem',
  Price = 'Price'
}

export enum orderItemsTableEnumMSG {
  Min = 'must be greater than or equal to',
}

export enum orderItemsTableEnumConfig {
  MinTotalAmount = 1,
  MaxTotalAmount = 99999,
  MinQuantity = 1,
  MaxQuantity = 9999,
  MinPrice = 0,
  MaxPrice = 9999
}