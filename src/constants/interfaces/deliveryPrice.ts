
export interface DeliveryPrice {
  stripeNaming: string
  higherPrice: number
  lowerPrice: number
  place: string
  _id: string
}

export type SaveDeliveryPrice = Omit<DeliveryPrice, 'place'>