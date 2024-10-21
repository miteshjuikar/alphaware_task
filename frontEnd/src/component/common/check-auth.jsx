
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children}) {

    const location = useLocation();

    if(!isAuthenticated && 
        !(location.pathname.includes('/login') || 
        location.pathname.includes('/register'))
    ){
        return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && 
        (location.pathname.includes('/login') || 
        location.pathname.includes('/register'))
    ){
        if(user?.role === 'admin' && user?.email.split('@')[1] === "alphaware.com"){
            return <Navigate to='/admin/form' />
        }
        else if(user?.role === 'user' && user?.email.split('@')[1] === "alphawarenext.com"){
            return <Navigate to='/user/listing' /> 
        }        
    }
    if(isAuthenticated && user.role !== 'admin' && user?.email.split('@')[1] !== "alphaware.com" && location.pathname.includes('admin')){
        return <Navigate to='unauth-page' />
    }
    if(isAuthenticated && user.role === 'admin' && user?.email.split('@')[1] === "alphaware.com" && location.pathname.includes('user')){
        return <Navigate to='/admin/form'/>
    }

    
  return (
    <>{children}</>
  )
}

export default CheckAuth
