import {React} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomerNavbar = ({id}) => {
  return (
    <AppBar position="static" sx={{mb:5}}>
      <Toolbar>
        {/* Company/Brand Logo or Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"left"}}>
          Comsol Customer Portal
        </Typography>

        {/* Link to Complaint Registration */}
        <Button component={Link} to="/customer/complaint-registration" color="inherit">
          Register Complaint
        </Button>

        {/* Link to Complaint Status with dynamic ID */}
        {id && 
        <Button component={Link} to={`/customer/complaint-status/${id}`} color="inherit">
          Complaint Status{console.log(id)}
        </Button>}
      </Toolbar>
    </AppBar>
  );
};

export default CustomerNavbar;
