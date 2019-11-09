import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Box, Button, Flex } from "rebass"
import { ThemeProvider } from "theme-ui"
import {
  faBox,
  faSignOutAlt,
  faShippingFast,
  faChartBar
} from "@fortawesome/free-solid-svg-icons"
import AuthProvider, { AuthContext } from "./AuthProvider"
import Navbar from "./Navbar"
import Sidebar from "../components/Sidebar"
import SidebarItem from "../components/SidebarItem"
import theme from "./theme.json"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider />
    </ThemeProvider>
  )
}

const Outbound = React.lazy(() => import("./Outbound"))
export function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Flex flexDirection="column" height="100vh" sx={{ fontFamily: "body" }}>
        <Navbar />
        <Flex flex="1" height="100%">
          <Sidebar>
            <SidebarItem icon={faBox} label="Create Inbound" />
            <SidebarItem icon={faShippingFast} label="Create Outbound" />
            <SidebarItem icon={faChartBar} label="View Reports" />
            <SidebarItem icon={faSignOutAlt} label="Sign Out" />
          </Sidebar>
          <Flex flex="1" height="100%">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/">
                  <Box bg="background">Home</Box>
                </Route>
                <Route path="/outbound">
                  <Outbound />
                </Route>
                <Route path="/inbound">
                  <div>Inbound</div>
                </Route>
                <Route path="/">Not found</Route>
              </Switch>
            </Suspense>
          </Flex>
        </Flex>
      </Flex>
    </BrowserRouter>
  )
}

export function NotAuthenticatedApp() {
  return (
    <AuthContext.Consumer>
      {({ authReady, signIn }) => {
        return (
          <Box height="100vh" width="100vw">
            <Flex alignItems="center" justifyContent="center" height="100%">
              {authReady && (
                <Button id="my-signin2" onClick={signIn}>
                  Sign In with Google
                </Button>
              )}
            </Flex>
          </Box>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default App
