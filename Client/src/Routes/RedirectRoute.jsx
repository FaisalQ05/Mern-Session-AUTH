import { Navigate, Outlet } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const RedirectRoute = ({ children, redirect = "login" }) => {
  if (children) {
    return <Navigate to={redirect} replace />
  } else {
    return <Outlet />
  }
}

export default RedirectRoute
