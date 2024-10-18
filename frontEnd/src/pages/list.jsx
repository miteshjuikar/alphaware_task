import React, { useEffect, useState } from 'react';
import JobCard from '../component/common/jobCard';
import AdminNavbar from '../component/admin/adminNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs } from '../store/api';
import Loader from '../component/common/loader';

function List() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobDetails);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs || []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const result = jobs.filter((job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(result);
  };
  
  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);
  
  const handleHomeClick = () => {
    setFilteredJobs(jobs);
  };

  return (
    <>
      <AdminNavbar handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} handleHomeClick={handleHomeClick} />
      <div style={styles.container}>
        <h1>Jobs Openings</h1>
        {
          filteredJobs.length > 0 ? (
            <div style={styles.cardContainer}>
              {filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          ) : (
            <p>No job openings available at the moment.</p>
          )
        }
        {!jobs && <Loader />}
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

export default List;
