import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const userExists=localStorage.getItem("chatAppUser")
  return (
    <div>
        {userExists?<Outlet/>:<Navigate to={'/login'}/>}
    </div>
  )
}

export default ProtectedRoute