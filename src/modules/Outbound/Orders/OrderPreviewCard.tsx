import React from "react"
import { Button, Flex, Text } from "rebass"
import Order, { getFormattedOrderCreatedTime } from "../../../data/Orders"
import OrderStatusIcon from "./OrderStatusIcon"

function OrderPreviewCard({
  activeOrderId,
  order,
  onOrderClick
}: {
  activeOrderId: string
  order: Order
  onOrderClick: Function
}) {
  const isActive = order.orderId === activeOrderId
  return (
    <Button
      bg={isActive ? "muted" : "background"}
      mx={1}
      my={1}
      sx={{
        border: "none",
        width: "95%",
        textAlign: "left",
        "&:hover, &:focus": {
          cursor: "pointer",
          backgroundColor: "muted"
        }
      }}
      onClick={() => onOrderClick(order.orderId)}
      role="button"
    >
      <Flex justifyContent="space-between" alignItems="center" color="grayDark">
        <Text py={2} fontWeight="bold" color="text">
          {order.orderId}
        </Text>
        <OrderStatusIcon status={order.status} />
      </Flex>
      <Text color="textMuted">{getFormattedOrderCreatedTime(order)}</Text>
    </Button>
  )
}

export default OrderPreviewCard
