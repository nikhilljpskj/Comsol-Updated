import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, LinearProgress, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import NavbarTop from '../components/NavbarTop';
import ConfirmationModal from '../components/ConfirmationModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ViewComplaints from './ViewComplaints';

import '../styles/Dashboard.css'; // Keep this if you have other custom styles
import StatsPage from './StatsPage';

const AdminDashboard = () => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [currentComplaintId, setCurrentComplaintId] = useState(null)
  const [projectStats, setProjectStats] = useState({
    "count_active_projects": 0,
    "count_pending_assignment": 0,
    "employee_count": 0
  });

  const [progress, setProgress] = useState({
    projects: 0,
    pending: 0,
    staff: 0,
  });

  
  const [loading, setLoading] = useState(true);

  const colorSetter = (value) =>{
    if(value <50){
      return "success"
    }
    else if(value < 80){
      return "warning"
    }
    else{
      return 'error'
    }
  }

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/complaints/admin-stats');
      setProjectStats(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);      
      // Check the user type immediately after parsing
      if (parsedUser.user_type === 'Admin') {
        console.log("helolla")
        navigate('/')
      }
    }
  }, []); // Empty dependency array to run only once


  useEffect(() => {
    fetchProjectDetails();
  },[]);

  useEffect(() => {
    if (projectStats.count_active_projects > 0) {
      setProgress({
        projects: calculateProgress(
          projectStats.count_active_projects - projectStats.count_pending_assignment,
          projectStats.count_active_projects
        ),
        pending: calculateProgress(
          projectStats.count_pending_assignment,
          projectStats.count_active_projects
        ),
        staff: calculateProgress(
          projectStats.count_pending_assignment,
          projectStats.employee_count,
        ),
      });
    }
    console.log(progress)
  }, [projectStats]); // Dependency array

  const calculateProgress = (value, max) => (value / max) * 100;


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
                    Active Complaints
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {projectStats.count_active_projects}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress.projects}
                    color={colorSetter(progress.projects)}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Complaints Progress
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Complaints Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PendingActionsIcon color="warning" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Pending Assignment
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {projectStats.count_pending_assignment}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Compare pending complaints to active complaints */}
                  <LinearProgress
                    variant="determinate"
                    value={progress.pending}
                    color={colorSetter(progress.pending)}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Pending Complaints Progress
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Number of Staff Card */}
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon color="primary" fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Number of Staff
                  </Typography>
                </Box>
                <Typography variant="h2" color="primary">
                  {projectStats.employee_count}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* depleted workforce */}
                  <LinearProgress
                    variant="determinate"
                    value={progress.staff > 100 ? 100 : progress.staff}
                    color={colorSetter(progress.staff > 100 ? 100 : progress.staff)}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Remaining workforce
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Active Complaints Table */}
        <Box sx={{ mt: 5 }}>
          <StatsPage />
        </Box>
        {/* Active Complaints Table */}
        {/* <Box sx={{ mt: 4 }}>
          <ViewComplaints />
        </Box> */}
      </div>
    </>
  );
};

export default AdminDashboard;
