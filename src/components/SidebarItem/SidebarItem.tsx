import React, { MouseEventHandler } from "react"
import { Box, Button, Flex } from "rebass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

function SidebarItem({
  icon,
  label,
  onClick
}: {
  icon: IconDefinition
  label: string
  onClick?: MouseEventHandler
}) {
  return (
    <Flex mx={2} my={3}>
      <Box flex={1} sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
        <Button variant="ghost" sx={{ fontWeight: "bold" }} onClick={onClick}>
          {label}
        </Button>
      </Box>
      <Button color="muted" variant="ghost" onClick={onClick}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </Button>
    </Flex>
  )
}

export default SidebarItem
