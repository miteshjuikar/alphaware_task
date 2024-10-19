import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewJob } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    contract: '',
    location: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addNewJob(formData))
          .then((data) => { 
           
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
            console.log(data?.payload?.message);
            navigate("/admin/listing");
        })
  };

  return (
    <div style={styles.container}>
      <h2>Create New Job </h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="company" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position</label>
          <input 
            type="text" 
            className="form-control" 
            id="position" 
            name="position" 
            value={formData.position} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contract" className="form-label">Contract Details</label>
          <textarea 
            className="form-control" 
            id="contract" 
            name="contract" 
            value={formData.contract} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input 
            type="text" 
            className="form-control" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default JobForm;
