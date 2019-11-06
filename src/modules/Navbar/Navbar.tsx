import React from "react"
import NavLink from "../../components/NavLink"
import { Flex, Text } from "rebass"

export default function Navbar() {
  return (
    <Flex px={3} py={3} color="background" bg="text" alignItems="center">
      <Text fontFamily="body" fontWeight="bold">
        TBP{" "}
        <span role="img" aria-label="potato">
          🥔
        </span>
      </Text>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/inbound">Inbound</NavLink>
      <NavLink to="/outbound">Outbound</NavLink>
      <NavLink to="/inventory">Inventory</NavLink>
    </Flex>
  )
}
