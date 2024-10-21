import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyForJob } from '../../store/api';
import { toast } from 'react-toastify';

const JobCard = ({ job }) => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleApply = (jobId) => { 
        dispatch(applyForJob(jobId)).then((data)=>{

        console.log(data, "applied Job Data");
        
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
        <div style={styles.card}>
            <h2 style={{ height: '100px' }}>{job.position}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Contract:</strong> {job.contract}</p>
            {
                user.role !== "admin" ? 
                <button style={styles.button} onClick={() => handleApply(job._id)}>Apply Now</button> :
                null
            }
            
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
    },
};

export default JobCard;
