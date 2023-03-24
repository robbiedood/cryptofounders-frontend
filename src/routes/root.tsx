import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"
// import Category from "../components/Category"
import NavProvider from "../NavContext"

export default function Root() {
  return (
    <NavProvider>
      <Nav/>
      <Outlet/>
    </NavProvider>
  )
}