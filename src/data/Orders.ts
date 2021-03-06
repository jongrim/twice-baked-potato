import * as R from "ramda"

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
  status: OrderStatus
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

export function getOrderCreatedTime(order: Order): string {
  const createdAtStatusObject = order.statusHistory.find(
    o => o.status === "CREATED"
  )
  if (createdAtStatusObject) {
    return createdAtStatusObject.createdAt
  }
  return ""
}

export function formatOrderDatetime(t: string) {
  return new Date(t).toDateString()
}

export const getFormattedOrderCreatedTime = R.compose(
  formatOrderDatetime,
  getOrderCreatedTime
)

export const capitalize = R.compose(
  R.join(""),
  (x: string[]) =>
    x.map((l: string, i: number) => {
      if (i === 0) return R.toUpper(l)
      return R.toLower(l)
    }),
  R.split("")
)

type GetShipmentMethod = (order: Order) => string
export const getShipmentMethod: GetShipmentMethod = R.compose(
  capitalize,
  R.toLower,
  R.prop("shipmentMethod")
)

export default Order
