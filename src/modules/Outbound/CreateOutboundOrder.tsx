import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Machine, assign, EventObject } from "xstate"
import { useMachine } from "@xstate/react"

interface FetchMachineCtx {
  data: { data: object } | undefined
  retries: number
}

interface FetchStateSchema {
  states: {
    idle: {}
    loading: {}
    success: {}
    failure: {}
  }
}

type FetchEvent = { type: "FETCH"; userId: string } | { type: "RETRY" }

const fetchMachine = Machine<FetchMachineCtx, FetchStateSchema, FetchEvent>({
  id: "fetch",
  initial: "idle",
  context: {
    data: undefined,
    retries: 0
  },
  states: {
    idle: {
      on: {
        FETCH: "loading"
      }
    },
    loading: {
      invoke: {
        src: "fetchResource",
        onDone: {
          target: "success",
          actions: assign({
            data: (_, event) => event.data
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

const fetchResource = (ctx: FetchMachineCtx, event: EventObject) => {
  return new Promise((resolve, reject) => {
    console.log("fetching...", event)
    setTimeout(() => {
      const r = Math.random()
      if (r < 0.5) {
        resolve({ response: "hi" })
      } else {
        reject(new Error("ERROR"))
      }
    }, 3000)
  })
}

const CreateOutboundOrder = () => {
  const [current, send] = useMachine(fetchMachine, {
    services: {
      fetchResource
    }
  })
  let nextMessage: FetchEvent
  switch (current.value) {
    case "idle":
      nextMessage = { type: "FETCH", userId: "1" }
      break
    case "failure":
      nextMessage = { type: "RETRY" }
      break
  }
  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          let errors: { email?: string } = {}
          if (!values.email) {
            errors.email = "Required"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address"
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>
              Email
              <Field type="email" name="email" aria-label="email" />
              <ErrorMessage name="email" component="div" />
            </label>
            <label>
              Password
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </label>
            {current.value !== "success" && (
              <button
                type="submit"
                disabled={current.value === "loading"}
                onClick={() => send(nextMessage)}
              >
                {current.value === "loading" ? "Loading" : "Submit"}
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateOutboundOrder
