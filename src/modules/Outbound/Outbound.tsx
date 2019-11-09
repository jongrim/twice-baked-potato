import React from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import { Box, Button, Flex } from "rebass"
import Loading from "../../components/Loading"
import { getOrders } from "../../services/orders"
import { Order } from "../../data/Orders"
import AciveOrderManager from "./Orders"

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
      {current.value === "loading" && (
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Loading />
        </Flex>
      )}
      {current.value === "success" && (
        <AciveOrderManager orders={current.context.data as Order[]} />
      )}
      {current.value === "failure" && (
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Button bg="secondary" onClick={() => send("RETRY")}>
            Retry loading orders
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default Outbound
