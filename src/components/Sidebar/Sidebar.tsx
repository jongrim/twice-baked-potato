import React, { ReactChild, useCallback, useRef } from "react"
import { Box, Flex } from "rebass"
import { Machine, assign, StateValue } from "xstate"
import { useMachine } from "@xstate/react"
import { TweenMax, Elastic } from "gsap"
import SidebarItem from "../SidebarItem"
import {
  faToggleOff,
  faToggleOn,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons"

interface SidebarContext {
  icon: IconDefinition
}

interface SidebarMachineSchema {
  states: {
    closed: {}
    closing: {}
    open: {}
    opening: {}
  }
}

type SidebarEvent = { type: "OPEN" } | { type: "CLOSE" }

const SidebarMachine = Machine<
  SidebarContext,
  SidebarMachineSchema,
  SidebarEvent
>(
  {
    id: "sidebar",
    initial: "open",
    context: {
      icon: faToggleOn
    },
    states: {
      closed: {
        on: {
          OPEN: { target: "opening" }
        }
      },
      closing: {
        on: {
          OPEN: { target: "opening" }
        },
        invoke: {
          src: "closeMenu",
          onDone: {
            target: "closed"
          }
        },
        entry: ["setToggleIconOff", "setLabelsNotVisible"]
      },
      opening: {
        on: {
          CLOSE: { target: "closing" }
        },
        invoke: {
          src: "openMenu",
          onDone: {
            target: "open"
          }
        },
        entry: ["setToggleIconOn", "setLabelsVisible"]
      },
      open: {
        on: {
          CLOSE: { target: "closing" }
        }
      }
    }
  },
  {
    actions: {
      setToggleIconOff: assign({
        icon: () => faToggleOff
      }),
      setToggleIconOn: assign({
        icon: () => faToggleOn
      })
    }
  }
)

const nextMessageMap: { [key: string]: SidebarEvent } = {
  closed: { type: "OPEN" },
  closing: { type: "OPEN" },
  open: { type: "CLOSE" },
  opening: { type: "CLOSE" }
}

function Sidebar({ children }: { children: ReactChild | ReactChild[] }) {
  const element = useRef(null)
  const openMenu = useCallback(() => {
    return new Promise(resolve => {
      TweenMax.to(element.current || {}, 0.5, {
        flex: "0 0 235px",
        backdropFilter: "blur(2px)",
        ease: Elastic.easeOut.config(1, 1),
        onComplete: resolve
      })
    })
  }, [element.current])
  const closeMenu = useCallback(() => {
    return new Promise(resolve => {
      TweenMax.to(element.current || {}, 0.5, {
        flex: "0 0 70px",
        backdropFilter: "blur(0px)",
        ease: Elastic.easeOut.config(1, 1),
        onComplete: resolve
      })
    })
  }, [element.current])

  const [current, send] = useMachine(SidebarMachine, {
    services: {
      openMenu,
      closeMenu
    }
  })

  const nextMessage: SidebarEvent = nextMessageMap[current.value.toString()]

  return (
    <Box
      bg="text"
      color="muted"
      height="100%"
      sx={{
        flex: "0 0 235px"
      }}
      ref={element}
    >
      <Flex flexDirection="column" width="100%" height="100%">
        {children}
        <Box my="auto" />
        <SidebarItem
          icon={current.context.icon}
          label="Collapse"
          onClick={() => send(nextMessage)}
        />
      </Flex>
    </Box>
  )
}

export default Sidebar
