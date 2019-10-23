import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Box, Button, Flex } from "rebass"
import { ThemeProvider } from "theme-ui"
import AuthProvider, { AuthContext } from "./AuthProvider"
import Navbar from "./Navbar"
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
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
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
