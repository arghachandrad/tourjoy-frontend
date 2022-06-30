import React from "react"

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/images/404.jpg"
        alt="Not Found"
        style={{ width: "100vh", height: "100vh" }}
      />
    </div>
  )
}

export default NotFound
