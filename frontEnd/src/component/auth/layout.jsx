import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  
  return (
    <div className="container">
      <h1 className="title">Welcome to Job Portal</h1>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout