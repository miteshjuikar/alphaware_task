import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'


function AdminLayout() {


  return (
    <div>
      <div>
        admin
      </div>
        <Outlet />
    </div>
  )
}

export default AdminLayout