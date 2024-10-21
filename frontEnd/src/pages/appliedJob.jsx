import React, { useEffect, useState } from 'react'
import AdminNavbar from '../component/admin/adminNavbar'
import { useDispatch } from 'react-redux'
import { fetchAppliedJobs } from '../store/api';
import JobCard from '../component/common/jobCard';
import Loader from '../component/common/loader';

function AppliedJobList() {

  const dispatch = useDispatch();
  const [appliedJobsList, setAppliedJobsList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  
  useEffect(() => {
    dispatch(fetchAppliedJobs()).then((data) => {
      setAppliedJobsList(data.payload.data.jobs);
      setFetchStatus(data.payload.success);
    });
  },[dispatch]);

  return (
    <>
      <AdminNavbar />
      <div >
        <h1>Applied Job List</h1>
        {
          appliedJobsList.length > 0 ? (
            <div style={styles.cardContainer}>
              {appliedJobsList.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          ) : 
          (
            <p>No applied jobs found for this user.</p>
          )
        }
      </div>
    </>

  )
}

const styles = {
  container: {
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

export default AppliedJobList