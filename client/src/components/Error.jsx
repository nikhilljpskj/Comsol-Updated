import React, { useEffect } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = ({ message }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to a different route if needed
    navigate('/contact'); // Example route; adjust as needed
  };

  useEffect(()=>{
    localStorage.removeItem('complaint_id');
  },[])

  return (
    <Alert 
      severity="error" 
      sx={{ m: 5, display: 'flex',flexDirection:"column", justifyContent:"center",textAlign:"center",alignItems: 'center' }} 
    >
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default Error;
