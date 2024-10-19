import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { registerUser } from '../store/auth-slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {      
      if(data?.payload.success){
         
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
          // console.log(data?.payload?.message);
          navigate("/auth/login");
      }
      else{
        console.log(data?.payload?.message);
      }
    })
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-bold">Sign in to your account</h1>
        <p className="mt-2">
          Already have an account
          <Link className="ml-2 font-weight-medium text-primary" to="/auth/login">
            Login
          </Link>
        </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            required
            />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default register;
