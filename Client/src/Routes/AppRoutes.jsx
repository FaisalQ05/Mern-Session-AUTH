import { useAuthenticationContext } from "../context/AuthContext"
import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"
import { Route, Routes } from "react-router-dom"

const AppRoutes = () => {
  const { userSession } = useAuthenticationContext()
  let routes
  if (userSession) {
    routes = <PrivateRoutes />
  } else {
    routes = <PublicRoutes />
  }
  return (
    <Routes>
      <Route path="/*" element={routes} />
    </Routes>
  )
}

export default AppRoutes
