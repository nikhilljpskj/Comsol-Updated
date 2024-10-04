import {React, useEffect, useState} from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, Box } from '@mui/material';
import axios from 'axios'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ConfirmationModal from '../components/ConfirmationModal';
import ViewComplaintsStaff from './ViewComplaintsStaff';

const StaffDashboard = () => {

  const [openModal, setOpenModal] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);
  const [staffStats, setStats] = useState({
    complaint_count : 0,
  });

  const calculateProgress = (value, max) => (value / max) * 100;

  const [progressData, setProgressData] = useState({
    pending : 0,
  }
  );

  const colorSetter = (value) =>{
    if(value <20){
      return "error"
    }
    else if(value < 50){
      return "warning"
    }
    else{
      return 'success'
    }
  }

  // Fetch the complaints assigned to the logged-in staff
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser && loggedInUser.id) {
          const response = await axios.get(`http://localhost:5000/api/complaints/${loggedInUser.id}/count`);
          setStats(response.data[0]);
        } 
      } catch (error) {
        console.log('Something went wrong')
      }
    };
    fetchComplaints();
  }, []);

  useEffect(() => {
    setProgressData({
      pending : calculateProgress(
        staffStats.complaint_count,
        staffStats.complaint_count
      )
    })
  }, [staffStats])
  


  return (
    <>
      <div className="dashboard-container">
        <Grid container spacing={3}>
          {/* Active Complaints Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <ReportProblemIcon color="error" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Assigned Complaints
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {staffStats.complaint_count}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progressData.pending}
                    color={colorSetter(progressData.pending)}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Work Progress
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <ViewComplaintsStaff/>
      </div>
    </>
  );
};

export default StaffDashboard;
