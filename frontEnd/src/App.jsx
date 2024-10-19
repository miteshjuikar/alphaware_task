import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './component/auth/layout'
import CheckAuth from './component/common/check-auth'
import AuthLogin from './pages/login'
import AuthRegister from './pages/register'
import { useDispatch, useSelector } from "react-redux"
import AdminForm from './component/admin/adminForm'
import Loader from './component/common/loader'
import { checkAuth } from './store/auth-slice'
import { useEffect } from 'react'
import AdminLayout from './component/admin/layout'
import List from './pages/list'
import AppliedJobList from './pages/appliedJob'


function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkAuth())
  }, [dispatch]);

  if (isLoading) return <Loader />;

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
           <Route path="listing" element={<List />} />
           <Route path="form" element={<AdminForm />} />
         </Route>

         <Route
           path="/user"
           element={
             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <AdminLayout />
             </CheckAuth>
           }
         >
           <Route path="listing" element={<List />} />
           <Route path="appliedJob" element={<AppliedJobList />} />
         </Route>

       </Routes>


    </div>
   </>
  )
}

export default App
