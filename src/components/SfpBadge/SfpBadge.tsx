import React from "react"
import { Box } from "rebass"

function SfpBadge({ isSfp }: { isSfp: boolean }) {
  return (
    <Box>
      <Box
        sx={{
          display: "inline-block",
          color: isSfp ? "white" : "text",
          bg: isSfp ? "primary" : "muted",
          px: 2,
          py: 1,
          borderRadius: 9999
        }}
      >
        {isSfp ? "SFP" : "Non-SFP"}
      </Box>
    </Box>
  )
}

export default SfpBadge
