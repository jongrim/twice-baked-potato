import React, { ReactChild, useCallback, useRef } from "react"
import { Box, Button, Flex } from "rebass"
import { Machine } from "xstate"
import { useMachine } from "@xstate/react"
import { TweenMax, Elastic } from "gsap"

interface SidebarContext {}

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
>({
  id: "sidebar",
  initial: "open",
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
        onDone: { target: "closed" }
      }
    },
    opening: {
      on: {
        CLOSE: { target: "closing" }
      },
      invoke: {
        src: "openMenu",
        onDone: { target: "open" }
      }
    },
    open: {
      on: {
        CLOSE: { target: "closing" }
      }
    }
  }
})

function Sidebar({ children }: { children: ReactChild }) {
  const element = useRef(null)
  const openMenu = useCallback(() => {
    return new Promise(resolve => {
      TweenMax.to(element.current || {}, 0.5, {
        flex: "0 0 250px",
        backdropFilter: "blur(2px)",
        ease: Elastic.easeOut.config(1, 1),
        onComplete: resolve
      })
    })
  }, [element.current])
  const closeMenu = useCallback(() => {
    return new Promise(resolve => {
      TweenMax.to(element.current || {}, 0.5, {
        flex: "0 0 15px",
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

  console.log(current)

  let nextMessage: SidebarEvent
  let buttonText: string
  switch (current.value) {
    case "open":
    case "opening":
      nextMessage = { type: "CLOSE" }
      buttonText = ">>"
      break
    case "closed":
    case "closing":
      nextMessage = { type: "OPEN" }
      buttonText = "<<"
      break
    default:
      buttonText = ">>"
  }

  return (
    <Box
      height="100%"
      sx={{
        flex: "0 0 250px",
        borderLeft: "thick double",
        borderColor: "muted"
      }}
      ref={element}
    >
      <Button
        px={1}
        py={1}
        sx={{ position: "relative", top: "8px", left: "-18px" }}
        onClick={() => send(nextMessage)}
        variant="outline"
      >
        <Flex alignItems="center">{buttonText}</Flex>
      </Button>
      <Flex flexDirection="column" alignItems="center" width="230px">
        {current.value === "closed" ? null : children}
      </Flex>
    </Box>
  )
}

export default Sidebar
