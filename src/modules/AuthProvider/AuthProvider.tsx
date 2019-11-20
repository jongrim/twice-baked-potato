import React, { useState, useEffect, useContext } from "react"
import { AuthenticatedApp, NotAuthenticatedApp } from "../App"
import createAuth0Client from "@auth0/auth0-spa-js"

export const AuthContext = React.createContext({
  isAuthenticated: false,
  user: {
    email: "",
    name: "",
    nickname: "",
    picture: "",
    sub: "",
    updated_at: ""
  },
  logout: () => {},
  loginWithPopup: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => {},
  getTokenSilently: () => {},
  getTokenWithPopup: () => {}
})

export const useAuth0 = () => useContext(AuthContext)

function AuthProvider() {
  // just a simple login - more robust implementation would look for a token in localStorage
  const [loading, setLoading] = useState(true)
  const [auth0, setAuth0] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    email: "",
    name: "",
    nickname: "",
    picture: "",
    sub: "",
    updated_at: ""
  })

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({
        domain: "dev-gmwurb0n.auth0.com",
        client_id: "Iwo5jMsStmjr2KWR1NZGvLTiMvCmLV1n"
      })
      setAuth0(auth0FromHook)

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
  }, [])

  const loginWithPopup = async (params = {}) => {
    try {
      await auth0.loginWithPopup(params)
      const user = await auth0.getUser()
      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
    }
  }

  // const handleRedirectCallback = async () => {
  //   setLoading(true)
  //   await auth0.handleRedirectCallback()
  //   const user = await auth0.getUser()
  //   setLoading(false)
  //   setIsAuthenticated(true)
  //   setUser(user)
  // }

  if (loading) {
    return <div>LOADING</div>
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithPopup,
        getIdTokenClaims: (...rest) => auth0.getIdTokenClaims(...rest),
        loginWithRedirect: (...rest) => auth0.loginWithRedirect(...rest),
        getTokenSilently: (...rest) => auth0.getTokenSilently(...rest),
        getTokenWithPopup: (...rest) => auth0.getTokenWithPopup(...rest),
        logout: (...rest) => auth0.logout(...rest)
      }}
    >
      {isAuthenticated ? <AuthenticatedApp /> : <NotAuthenticatedApp />}
    </AuthContext.Provider>
  )
}

export default AuthProvider
