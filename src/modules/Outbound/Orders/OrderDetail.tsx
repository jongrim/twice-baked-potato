import React from "react"
import { Box, Card, Text, Flex, Button } from "rebass"
import Order, {
  capitalize,
  getFormattedOrderCreatedTime,
  getShipmentMethod
} from "../../../data/Orders"
import OrderStatusIcon from "./OrderStatusIcon"
import SfpBadge from "../../../components/SfpBadge"

function OrderDetail({ order }: { order: Order }) {
  return (
    <Box>
      <Card
        px={2}
        py={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "20% 30% 30% 20%",
          gridAutoRows: theme => theme.sizes["10"],
          boxShadow: "lg",
          alignItems: "center"
        }}
      >
        <Text color="primary">Order {order.orderId}</Text>
        <Text>{order.companyName}</Text>
        <SfpBadge isSfp={order.sfp} />
        <Text>{getShipmentMethod(order)}</Text>
        <Text color="textMuted">{getFormattedOrderCreatedTime(order)}</Text>
        <Text>Qty {order.totalQuantity}</Text>
        <Box>
          <Text pr={2} display="inline-block">
            {capitalize(order.status)}
          </Text>
          <OrderStatusIcon status={order.status} />
        </Box>
        <Text>{order.carrierName}</Text>
      </Card>
      <Flex
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{JSON.stringify(order)}</Text>
      </Flex>
    </Box>
  )
}

export default OrderDetail
