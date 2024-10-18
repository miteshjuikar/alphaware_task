import React, { useEffect, useState } from 'react'
import JobCard from '../component/common/jobCard';
import AdminNavbar from '../component/admin/adminNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs } from '../store/api';
import Loader from '../component/common/loader';

function List() {

  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobDetails);

  useEffect(()=> {
    dispatch(fetchAllJobs())
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);        
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    
  };
  
  return (
    <>
    <AdminNavbar handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
    <div style={styles.container}>
      <h1>Jobs Openings</h1>
      {
        jobs 
        ? 
            jobs.length > 0 ?
            <>
                <div style={styles.cardContainer}>
                  {jobs.map((job, index) => (
                      <JobCard key={index} job={job} />
                  ))}
                </div> 
            </> 
          :
            <p>No job openings available at the moment.</p>
            
        : <Loader />
      }
        
    </div>
    </>
  );
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

export default List