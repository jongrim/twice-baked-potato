import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./App.css"

const Outbound = React.lazy(() => import("./Outbound"))
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Navbar />
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
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
