import AuthContext from "./context/AuthContext"
import AppRoutes from "./Routes/AppRoutes"

function App() {
  return (
    <div className="app">
      <AuthContext>
        <AppRoutes />
      </AuthContext>
    </div>
  )
}

export default App
