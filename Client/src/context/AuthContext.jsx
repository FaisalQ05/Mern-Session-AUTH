import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { isAuthRoute } from "../utils/ApiRoutes"

const AuthenticationContext = createContext({})
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthenticationContext = () => useContext(AuthenticationContext)

// eslint-disable-next-line react/prop-types
const AuthContext = ({ children }) => {
  // console.log("auth context")
  const [userSession, setUserSession] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setIsLoading(true)
        await axios.get(isAuthRoute, { withCredentials: true })
        // console.log(res)
        setUserSession(true)
        setIsLoading(false)
        setRequestSuccess(true)
      } catch (error) {
        // console.log(error.response.data)
        if (error.response.data) {
          setUserSession(false)
          setIsLoading(false)
          setRequestSuccess(true)
        }
      }
    }
    fetchUserAuth()
  }, [])
  const value = { userSession, setUserSession }
  return (
    <AuthenticationContext.Provider value={value}>
      {isLoading ? (
        <h3 className="loader">...Loading</h3>
      ) : (
        requestSuccess && children
      )}
    </AuthenticationContext.Provider>
  )
}

export default AuthContext
