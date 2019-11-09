import React, { useState, useEffect } from "react"
import { AuthenticatedApp, NotAuthenticatedApp } from "../App"
import credentials from "./credentials.json"

declare global {
  interface Window {
    gapi: {
      load: Function
      auth2: {
        getAuthInstance: Function
        init: Function
      }
      signin2: {
        render: Function
      }
    }
    init: Function
  }
}

export const AuthContext = React.createContext({
  authReady: false,
  isAuthenticated: false,
  user: {},
  signIn: () => {},
  signOut: () => {}
})

function AuthProvider() {
  // just a simple login - more robust implementation would look for a token in localStorage
  const [authLoaded, setAuthLoaded] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!authReady && authLoaded) {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: credentials.web.client_id
          })
          .then(() => {
            setAuthReady(true)
          })
      })
    } else if (!authLoaded && !authReady && window.gapi) {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: credentials.web.client_id
          })
          .then(() => {
            setAuthReady(true)
          })
      })
    }
  }, [authReady, authLoaded])

  window.init = function init() {
    setAuthLoaded(true)
  }

  function onSignIn(googleUser: { getBasicProfile: Function }) {
    const profile = googleUser.getBasicProfile()
    setUser(profile)
    setIsAuthenticated(true)
  }

  function signOut() {
    const auth = window.gapi.auth2.getAuthInstance()
    auth.signOut().then(() => {
      setIsAuthenticated(false)
      setUser({})
    })
  }

  function signIn() {
    const auth = window.gapi.auth2.getAuthInstance()
    auth
      .signIn({
        prompt: "select_account",
        scope: "profile email"
      })
      .then(onSignIn)
  }

  return (
    <AuthContext.Provider
      value={{ authReady, isAuthenticated, user, signIn, signOut }}
    >
      {process.env.NODE_ENV === "development" ? (
        <AuthenticatedApp />
      ) : isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
        <NotAuthenticatedApp />
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
