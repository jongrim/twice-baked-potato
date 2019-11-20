import React, { useEffect } from "react"
import { Machine, assign, StateMachine } from "xstate"
import { useMachine } from "@xstate/react"
import { Box, Button, Flex } from "rebass"
import Loading from "../../../components/Loading"
import { getOrderItems, Item, OrderItem } from "../../../services/items"

interface FetchMachineCtx {
  orderId: string
  data: Item[] | undefined
  retries: number
}

interface FetchStateSchema {
  states: {
    loading: {}
    success: {}
    failure: {}
  }
}

type FetchEvent =
  | { type: "FETCH"; data?: { orderId: string } }
  | { type: "RETRY" }

const fetchMachine = ({
  orderId
}: {
  orderId: string
}): StateMachine<FetchMachineCtx, FetchStateSchema, FetchEvent> =>
  Machine<FetchMachineCtx, FetchStateSchema, FetchEvent>({
    id: "fetchOrderItems",
    initial: "loading",
    context: {
      orderId,
      data: undefined,
      retries: 0
    },
    states: {
      loading: {
        invoke: {
          src: "getOrderItems",
          onDone: {
            target: "success",
            actions: assign({
              data: (_, event) => {
                return event.data
              }
            })
          },
          onError: {
            target: "failure",
            actions: assign({
              data: (_, event) => event.data
            })
          }
        },
        on: {
          FETCH: {
            target: "loading",
            actions: assign({
              orderId: (ctx, event) => event.data.orderId
            })
          }
        }
      },
      success: {
        on: {
          FETCH: {
            target: "loading",
            actions: assign({
              orderId: (ctx, event) => event.data.orderId
            })
          }
        }
      },
      failure: {
        on: {
          RETRY: {
            target: "loading",
            actions: assign({
              data: context => context.data,
              orderId: context => context.orderId,
              retries: context => context.retries + 1
            })
          }
        }
      }
    }
  })

const OrderItems = ({ orderId }: { orderId: string }) => {
  const [current, send] = useMachine(fetchMachine({ orderId }), {
    services: {
      getOrderItems: (ctx, event): Promise<OrderItem[]> => {
        console.log(event)
        return getOrderItems({ orderId: ctx.orderId })
      }
    },
    devTools: true
  })
  useEffect(() => {
    send({ type: "FETCH", data: { orderId } })
  }, [orderId])
  return (
    <Box height="100%" width="100%">
      {current.value === "loading" && (
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Loading />
        </Flex>
      )}
      {current.value === "success" && (
        <Box>{JSON.stringify(current.context.data)}</Box>
      )}
      {current.value === "failure" && (
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Button bg="secondary" onClick={() => send("RETRY")}>
            Retry loading items
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default OrderItems
