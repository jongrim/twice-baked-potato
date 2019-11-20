import React, { MouseEventHandler, ReactElement } from "react"
import { NavLink as RouterNavLink } from "react-router-dom"
import { Box, Button, Flex, Link } from "rebass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import NavLink from "../NavLink"

type SidebarItemVariant = "link" | "action"

function SidebarItem({
  icon,
  label,
  onClick,
  to,
  variant
}: {
  icon: IconDefinition
  label: string | ReactElement
  onClick?: MouseEventHandler
  to?: string
  variant: SidebarItemVariant
}) {
  return (
    <Flex mx={2} my={3}>
      <Box flex={1} sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
        {variant === "link" ? (
          <Button variant="navlink">
            <NavLink to={to}>{label}</NavLink>
          </Button>
        ) : (
          <Button
            variant="navlink"
            onClick={onClick}
            sx={{
              "::after": {
                content: "''",
                display: "block",
                width: "0px",
                height: "4px",
                backgroundColor: theme => theme.colors.secondary,
                transition: "width .3s ease-out"
              },
              ":hover::after": {
                width: "100%"
              }
            }}
          >
            {label}
          </Button>
        )}
      </Box>
      {variant === "link" ? (
        <Button variant="ghost">
          <Link
            color="light"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "body"
            }}
            as={RouterNavLink}
            variant="nav"
            //@ts-ignore
            to={to}
          >
            <FontAwesomeIcon icon={icon} size="lg" />
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" onClick={onClick}>
          <FontAwesomeIcon icon={icon} size="lg" />
        </Button>
      )}
    </Flex>
  )
}

export default SidebarItem
