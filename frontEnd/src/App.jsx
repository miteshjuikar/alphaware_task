import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './component/auth/layout'
import CheckAuth from './component/common/check-auth'
import AuthLogin from './pages/login'
import AuthRegister from './pages/register'
import { useDispatch, useSelector } from "react-redux"


function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <>
    <div>
       <Routes>
         <Route
           path="/"
           element={
             <CheckAuth
               isAuthenticated={isAuthenticated}
               user={user}
             ></CheckAuth>
           }
         />
         <Route
           path="/auth"
           element={
             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <AuthLayout />
             </CheckAuth>
           }
         >
           <Route path="login" element={<AuthLogin />} />
           <Route path="register" element={<AuthRegister />} />
         </Route>

        <Route
           path="/admin"
           element={
             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <AdminLayout />
             </CheckAuth>
           }
         >
           <Route path="form" element={<AdminDashboard />} />
           <Route path="list" element={<AdminProducts />} />
         </Route>

       {/*    <Route path="/user" element={
               <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                 <ShoppingLayout/>
               </CheckAuth>
           }>
           <Route path="listing" element={<ShoppingHome/>} />
         </Route>
         <Route path="unauth-page" element={<UnauthPage />} /> */}

       </Routes>


    </div>
   </>
  )
}

export default App
