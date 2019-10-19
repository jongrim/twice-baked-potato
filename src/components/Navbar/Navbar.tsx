import React from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/inbound">Inbound</NavLink>
      <NavLink to="/outbound">Outbound</NavLink>
      <NavLink to="/inventory">Inventory</NavLink>
    </nav>
  )
}
