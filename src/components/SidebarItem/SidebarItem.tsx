import React, { MouseEventHandler } from "react"
import { Box, Button, Flex, Text } from "rebass"
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
    <Flex mx={2} my={3} onClick={onClick}>
      <Box flex={1} sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
        <Text
          fontFamily="body"
          fontWeight="bold"
          px={2}
          py={2}
          sx={{
            display: "inline-block",
            borderRadius: "12px",
            ":hover": {
              cursor: "pointer",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }
          }}
        >
          {label}
        </Text>
      </Box>
      <Button
        color="muted"
        variant="ghost"
        sx={{
          borderRadius: "12px",
          ":hover": {
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }
        }}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </Button>
    </Flex>
  )
}

export default SidebarItem
