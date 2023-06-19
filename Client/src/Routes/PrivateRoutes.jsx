import { Route, Routes } from "react-router-dom"
import Me from "../components/Me"
import RedirectRoute from "./RedirectRoute"

const PrivateRoutes = () => {
  
  return (
    <Routes>
      <Route element={<RedirectRoute />}>
        <Route index element={<Me />} />
        <Route path="abc" element={<h1>Another private route</h1>} />
        <Route
          path="*"
          element={
            <RedirectRoute redirect="/">
              <Me />
            </RedirectRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
