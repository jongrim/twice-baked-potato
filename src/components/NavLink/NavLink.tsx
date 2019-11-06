import React from "react"
import { Box, Link } from "rebass"
import { NavLink as RouterNavLink, useLocation } from "react-router-dom"

export default function NavLink({ ...props }) {
  const location = useLocation()
  const isActive = location.pathname === props.to
  return (
    <Box
      sx={{
        "::after": {
          content: "''",
          display: "block",
          width: "0px",
          height: "4px",
          backgroundColor: "#9c27b0",
          transition: "width .3s ease-out"
        },
        ":hover::after": {
          width: "100%"
        }
      }}
      height="100%"
      mx={6}
    >
      <Link
        {...props}
        color={isActive ? "primary" : "muted"}
        sx={{
          textDecoration: "none",
          fontWeight: "bold",
          fontFamily: "body"
        }}
        as={RouterNavLink}
        variant="nav"
      />
    </Box>
  )
}