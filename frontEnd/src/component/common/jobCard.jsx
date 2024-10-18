import React from 'react';

const JobCard = ({ job }) => {
    return (
        <div style={styles.card}>
            <h2 style={{ height: '100px' }}>{job.position}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p>{job.contract}</p>
            <button style={styles.button}>Apply Now</button>
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
