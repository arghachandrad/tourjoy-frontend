import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function LoadingToRedirect() {
  const navigate = useNavigate()
  const [count, setCount] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && navigate("/login")
    return () => clearInterval(interval)
  }, [count, navigate])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  )
}

export default LoadingToRedirect
