import React from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import { Box } from "rebass"
import OrderPreviewList from "./OrderPreviewList"
import OrderDetail from "./OrderDetail"
import Order from "../../../data/Orders"

interface OrderViewMachineCtx {
  activeOrderId: string
}

interface OrderViewMachineState {
  states: {
    display: {}
  }
}

type OrderViewMachineEvent = { type: "SELECT"; data: string }

const orderViewMachine = Machine<
  OrderViewMachineCtx,
  OrderViewMachineState,
  OrderViewMachineEvent
>({
  id: "orderView",
  initial: "display",
  context: {
    activeOrderId: ""
  },
  states: {
    display: {
      on: {
        SELECT: {
          target: "display",
          actions: assign({
            activeOrderId: (ctx, event) => {
              return event.data
            }
          })
        }
      }
    }
  }
})

function ActiveOrderManager({ orders }: { orders: Order[] }) {
  const [current, send] = useMachine(orderViewMachine, {
    context: {
      activeOrderId: orders[0].orderId
    }
  })

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "270px auto",
        gridColumnGap: theme => theme.sizes["6"]
      }}
      height="100%"
      pt={2}
      px={2}
    >
      <OrderPreviewList
        activeOrderId={current.context.activeOrderId}
        orders={orders}
        onOrderClick={(id: string) => send({ type: "SELECT", data: id })}
      />
      <OrderDetail
        order={
          orders.find(
            order => order.orderId === current.context.activeOrderId
          ) || orders[0]
        }
      />
    </Box>
  )
}

export default ActiveOrderManager
