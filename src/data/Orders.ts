// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface Order {
  orderId: string
  merchantId: string
  referenceNumber: string
  merchantName: string
  shipmentMethod: string
  status: string
  companyName: string
  shipAddress: ShipAddress
  purchaseOrderNumber: string | null
  totalQuantity: number
  inventoryAvailable: boolean
  outOfRegion: boolean
  acceptsOutOfRegion: boolean
  acceptsNextDayShipping: boolean
  carrierName: string | null
  facility: Facility
  statusHistory: StatusHistory[]
  sfp: boolean
}

export interface Facility {
  id: string
  name: string
}

export interface ShipAddress {
  validAddress: boolean
  addressValidationResolved: boolean
}

export type OrderStatus =
  | "CREATED"
  | "APPROVED"
  | "PICKING"
  | "PICKED"
  | "SHIPPED"

export interface StatusHistory {
  status: OrderStatus
  createdAt: string
}

export const makeOrderOperator = (order: Order) => (fn: Function) => fn(order)

export const getProp = (k: keyof Order) => (order: Order) => order[k]