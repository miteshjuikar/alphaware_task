import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Your custom styles
import { loginUser } from '../store/auth-slice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload.success){
        console.log(data?.payload?.message);
      }
    }).catch((err)=>{ console.log(err, "catch error")})
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-bold">Sign in to your account</h1>
        <p className="mt-2">
          Don't have an account?
          <Link className="ml-2 font-weight-medium text-primary" to="/auth/register">
            Register
          </Link>
        </p>

      <form onSubmit={handleSubmit}>        
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

export default Login;
