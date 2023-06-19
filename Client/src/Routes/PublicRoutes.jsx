import { Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"
import RedirectRoute from "./RedirectRoute"

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<RedirectRoute />}>
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            <RedirectRoute>
              <Login />
            </RedirectRoute>
          }
        />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default PublicRoutes
