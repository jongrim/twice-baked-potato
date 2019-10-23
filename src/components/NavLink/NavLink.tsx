import React from "react"
import { Link } from "rebass"
import { NavLink as RouterNavLink, useLocation } from "react-router-dom"

export default function NavLink({ ...props }) {
  const location = useLocation()
  const isActive = location.pathname === props.to
  return (
    <Link
      {...props}
      color={isActive ? "secondary" : "text"}
      sx={{ textDecoration: "none", fontWeight: "bold", fontFamily: "body" }}
      as={RouterNavLink}
      variant="nav"
    />
  )
}
