import React from "react"
import { Link } from "react-router-dom"
import { Box, Flex, Image, Text } from "rebass"
import { useAuth0 } from "../AuthProvider/AuthProvider"

export default function Navbar() {
  const { user } = useAuth0()
  return (
    <Flex
      px={4}
      py={3}
      color="background"
      bg="text"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontFamily="body" fontWeight="bold">
        TBP
        <Box pl={2} role="img" aria-label="potato" display="inline-block">
          🥔
        </Box>
      </Text>
      <Link to="/me">
        <Image
          src={user.picture}
          sx={{
            width: 10,
            height: 10,
            borderRadius: 9999
          }}
        />
      </Link>
    </Flex>
  )
}
