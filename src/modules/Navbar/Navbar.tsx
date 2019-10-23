import React from "react"
import NavLink from "../../components/NavLink"
import { Flex, Text } from "rebass"
import { AuthContext } from "../AuthProvider"

export default function Navbar() {
  return (
    <AuthContext.Consumer>
      {({ signOut }: { signOut: Function }) => (
        <Flex
          px={3}
          py={3}
          color="text"
          bg="muted"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight="bold">
            Twice Baked Potato{" "}
            <span role="img" aria-label="potato">
              🥔
            </span>
          </Text>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/inbound">Inbound</NavLink>
          <NavLink to="/outbound">Outbound</NavLink>
          <NavLink to="/inventory">Inventory</NavLink>
          <NavLink to="/" onClick={signOut}>
            Log Out
          </NavLink>
        </Flex>
      )}
    </AuthContext.Consumer>
  )
}
