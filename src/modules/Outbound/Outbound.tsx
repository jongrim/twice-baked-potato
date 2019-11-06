import React from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import { Box, Flex, Heading } from "rebass"
import { getOrders } from "../../services/orders"
import { makeOrderOperator, getProp, Order } from "../../data/Orders"

interface FetchMachineCtx {
  data: Order[] | undefined
  retries: number
}

interface FetchStateSchema {
  states: {
    loading: {}
    success: {}
    failure: {}
  }
}

type FetchEvent = { type: "FETCH" } | { type: "RETRY" }

const fetchMachine = Machine<FetchMachineCtx, FetchStateSchema, FetchEvent>({
  id: "fetch",
  initial: "loading",
  context: {
    data: undefined,
    retries: 0
  },
  states: {
    loading: {
      invoke: {
        src: "getOrders",
        onDone: {
          target: "success",
          actions: assign({
            data: (_, event) => {
              return event.data.results
            }
          })
        },
        onError: {
          target: "failure",
          actions: assign({
            data: (_, event) => event.data
          })
        }
      }
    },
    success: {
      type: "final"
    },
    failure: {
      on: {
        RETRY: {
          target: "loading",
          actions: assign({
            data: context => context.data,
            retries: context => context.retries + 1
          })
        }
      }
    }
  }
})

const Outbound = () => {
  const [current, send] = useMachine(fetchMachine, {
    services: {
      getOrders
    }
  })
  return (
    <Box height="100%" width="100%">
      <Heading as="h1">Outbound Orders</Heading>
      <Box>
        {current.value === "success" &&
          current.context.data &&
          current.context.data.map(o => {
            const order = makeOrderOperator(o)
          })}
      </Box>
    </Box>
  )
}

export default Outbound
