import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { loginRoute } from "../utils/ApiRoutes"
import { useAuthenticationContext } from "../context/AuthContext"

const Login = () => {
  const { setUserSession } = useAuthenticationContext()

  const [user, setUser] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)

  const HandleInputEvent = (e) => {
    setUser((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const requestLogin = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          loginRoute,
          {
            email: user.email,
            password: user.password,
          },
          { withCredentials: true }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(user)
    setIsLoading(true)
    try {
      const res = await requestLogin()
      if (res.data?.isLogin) {
        // navigate("/me", { replace: true })
        setIsLoading(false)
        setUserSession(true)
      }
    } catch (error) {
      setIsLoading(false)
      // console.log(error)
    }
  }

  return (
    <>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.email}
          name="email"
          onChange={HandleInputEvent}
        />
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={HandleInputEvent}
        />
        <button>{isLoading ? "...Loading" : "Login"}</button>
        <p>
          Don,t have account <Link to="/register">Register here</Link>
        </p>
      </form>
    </>
  )
}

export default Login
