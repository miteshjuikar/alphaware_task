import React from 'react';
import { useSelector } from 'react-redux';

const JobCard = ({ job }) => {

    const { user } = useSelector((state) => state.auth);

    const handleApply = () => {
        // call api
    }

    return (
        <div style={styles.card}>
            <h2 style={{ height: '100px' }}>{job.position}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Contract:</strong> {job.contract}</p>
            {
                user.role !== "admin" ? 
                <button style={styles.button} onClick={handleApply}>Apply Now</button> :
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
