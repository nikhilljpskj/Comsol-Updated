import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar 
} from '@mui/material';
import Alert from '@mui/material/Alert';

function ViewComplaintsStaff() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [additionalComment, setAdditionalComment] = useState('');
  const [staffLocation, setStaffLocation] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch the complaints assigned to the logged-in staff
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser && loggedInUser.id) {
          const response = await axios.get(`http://localhost:5000/api/viewcomplaintsstaff/${loggedInUser.id}`);
          setComplaints(response.data);
        } else {
          setError('User is not logged in.');
        }
      } catch (error) {
        setError('Failed to fetch complaints.');
      }
    };
    fetchComplaints();
  }, []);

  // Convert status value to human-readable format
  const getStatusLabel = (status) => {
    switch (status) {
      case '1':
        return 'Open';
      case '2':
        return 'Closed';
      default:
        return 'Unknown';
    }
  };

  // Handle the view button click to open popup and pre-fill input fields
  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setDiagnosis(complaint.diagnosis || ''); // Pre-fill Diagnosis if available
    setAdditionalComment(complaint.additional_comments || ''); // Pre-fill Additional Comment if available
    setStaffLocation(complaint.staff_location || ''); // Pre-fill Staff Location if available
    setShowPopup(true);
  };

  // Fetch the current location of the staff
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStaffLocation(`https://www.google.com/maps/place/${latitude},${longitude}/`);
        },
        (error) => {
          setError('Failed to fetch location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Handle updating the complaint with diagnosis, additional comments, and location
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/viewcomplaintsstaff/update/${selectedComplaint.id}`, {
        diagnosis,
        additionalComment,
        staffLocation
      });
      if (response.data.success) {
        setSuccessMessage('Complaint updated successfully.');
        setShowPopup(false); // Close popup on success
      }
    } catch (error) {
      setError('Failed to update complaint.');
    }
  };

  return (
    <Container sx={{mt:5}}>
      <Typography variant="h4" gutterBottom>Assigned Complaints</Typography>
      {error && <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
      </Snackbar>}
      {successMessage && <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success">{successMessage}</Alert>
      </Snackbar>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Complaint ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Complaint</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>{complaint.id}</TableCell>
                <TableCell>{complaint.customer_name}</TableCell>
                <TableCell>{complaint.complaint}</TableCell>
                <TableCell>{getStatusLabel(complaint.status)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleView(complaint)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPopup && selectedComplaint && (
        <Dialog open={showPopup} onClose={() => setShowPopup(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Complaint Details</DialogTitle>
          <DialogContent>
            <Typography><strong>Name:</strong> {selectedComplaint.customer_name}</Typography>
            <Typography><strong>Mobile:</strong> {selectedComplaint.mobile_number}</Typography>
            <Typography><strong>Complaint:</strong> {selectedComplaint.complaint}</Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Additional Comment"
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Staff Location"
              value={staffLocation}
              readOnly
            />
            <Button variant="contained" color="secondary" onClick={fetchLocation}>Fetch Location</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
            <Button onClick={() => setShowPopup(false)} variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default ViewComplaintsStaff;
