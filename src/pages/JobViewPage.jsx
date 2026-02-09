import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobView from './../components/JobView';
import { viewJob } from "../api/auth";

const JobViewPage = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      
      // Replace with your actual API endpoint
      const response = await viewJob(id);
      
      setJobData(response.data.data);
      setError(null);
    } catch (err) {
      console.log(err);
      console.error('Error fetching job:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Job</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/find-job')}>
          Back to Jobs
        </button>
      </div>
    );
  }

  // No data state
  if (!jobData) {
    return (
      <div className="error-container">
        <h2>Job Not Found</h2>
        <p>The job you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/find-job')}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return <JobView jobData={jobData} />;
};

export default JobViewPage;