import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth-slice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = ({handleSearchSubmit, handleSearchChange, handleHomeClick }) => {
    
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser()).then((data)=> {

      
 console.log(data.payload.success);
 
            if(data?.payload?.success){
                toast.success(data?.payload?.message, {
                    autoClose: 5000,
                  })
            }
            else{
                toast.error(data?.payload?.message, {
                    autoClose: 5000,
                  })
            }
  })

  }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <img 
            src="https://alphaware.io/wp-content/uploads/2023/03/Alphaware-Next_technologies-logo.svg" 
            alt="company logo" 
            width="150" 
            height="80" 
        />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <Link className="nav-link active" onClick={handleHomeClick} to={user.role === "admin" ? "/admin/listing" : "/user/listing"}>
                    Home
                  </Link>
              </li>
              {
                user.role==="admin" ?
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/form">New Job</Link>
                    </li>
                    : null
              }
               
            </ul>

            { handleSearchSubmit && handleSearchChange?
                  <>
                    <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                      <input className="form-control me-2" onChange={handleSearchChange} type="search" placeholder="Search" aria-label="Search" />
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <button className="btn btn-outline-success" 
                            style={{ marginLeft: '10px' }} 
                            type="button"
                            onClick={handleLogout}
                    >Logout</button>
                  </>
                    :
                  <button className="btn btn-outline-success" type="button">Logout</button>

            }
           
          </div>
        </div>
      </nav>
    );
};

export default AdminNavbar;
