import React from "react"
import { Box } from "rebass"
import Order from "../../../data/Orders"
import OrderPreviewCard from "./OrderPreviewCard"

function OrderPreviewList({
  activeOrderId,
  orders,
  onOrderClick
}: {
  activeOrderId: string
  orders: Order[]
  onOrderClick: Function
}) {
  return (
    <Box overflow="scroll" height="100%">
      {orders.map(o => (
        <OrderPreviewCard
          activeOrderId={activeOrderId}
          order={o}
          key={o.orderId}
          onOrderClick={onOrderClick}
        />
      ))}
    </Box>
  )
}

export default OrderPreviewList
