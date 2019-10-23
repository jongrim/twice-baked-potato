import React from "react"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import { Heading, Box } from "rebass"
import { getOrders } from "../../services/orders"

interface FetchMachineCtx {
  data: { data: object } | undefined
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
  console.log(current)
  return (
    <div>
      <Heading as="h1">Outbound Orders</Heading>
      {current.value === "success" && (
        <Box>{JSON.stringify(current.context.data)}</Box>
      )}
    </div>
  )
}

export default Outbound
