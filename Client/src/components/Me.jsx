import axios from "axios"
import { getUserRoute, logOutRoute } from "../utils/ApiRoutes"
import { useEffect, useState } from "react"
import { useAuthenticationContext } from "../context/AuthContext"

const Me = () => {
  const { setUserSession } = useAuthenticationContext()
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const getUserDetails = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(getUserRoute, { withCredentials: true })
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const resposne = await getUserDetails()
      setUser(resposne.data?.user)
      setIsLoading(false)
    } catch (error) {
      // console.log(error)
      setIsLoading(false)
    }
  }

  const handlesubmit = async () => {
    try {
      const response = await axios.post(
        logOutRoute,
        {},
        { withCredentials: true }
      )
      if (response.data.isLogout) {
        setUserSession(false)
      }
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        "...loading"
      ) : (
        <div>
          <h1>{user?.username}</h1>
          <h3>{user?.email}</h3>
          <button onClick={handlesubmit}>Logout</button>
        </div>
      )}
    </>
  )
}

export default Me
