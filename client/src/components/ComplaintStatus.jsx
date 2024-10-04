import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ComplaintStatus.css'; // Create CSS to style this page
import ComplaintTimeline from './ComplaintTimeline';
import LinearProgress from '@mui/material/LinearProgress';
import CustomerNavbar from './CustomerNavbar';
import Error from './Error';

function ComplaintStatus() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch complaint data
    const fetchComplaint = async () => {
      try {
        localStorage.setItem('complaint_id',id);
        const response = await axios.get(`http://localhost:5000/api/complaints/${id}`);
        setComplaint(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError('Please use the link sent to your registered WhatsApp Number,');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchComplaint();
  }, [id]);

  // Function to display the status in a user-friendly way
  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return <span className="status unassigned">Unassigned</span>;
      case 1:
        return <span className="status assigned">Assigned</span>;
      case 2:
        return <span className="status completed">Completed & Archived</span>;
      default:
        return <span className="status unknown">We are working on it</span>;
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Error message={error}/>;
  }

  if (!complaint) {
    return <div>No complaint data available.</div>; // Handle if complaint is null
  }

  return (
    <>
    <CustomerNavbar id={id}/>
    <div className="base-container w-100">
      <div className="complaint-status-container">
        <h2>Complaint Status</h2>
        <div className="complaint-details">
          {/* <p><strong>Customer Name:</strong> {complaint.customer_name}</p> */}
          <p><strong>Complaint ID:</strong> {complaint.id}</p>
          <p><strong>Complaint Description:</strong> {complaint.complaint}</p>
          <p><strong>Assigned Staff:</strong> {complaint.staff_assigned || 'Pending'}</p>
          <p><strong>Status:</strong> {renderStatus(complaint.status)}</p>
        </div>
      </div>
      <ComplaintTimeline />
    </div>
    </>
  );
}

export default ComplaintStatus;
