import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, Typography, Link
  
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress


function ViewComplaints() {
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignmentLoading, setassignmentLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Complaint to show in popup
  const [assignedEmployee, setAssignedEmployee] = useState(''); // Selected employee
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Control popup visibility

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch complaints.');
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/staff');
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees.');
      }
    };

    fetchComplaints();
    fetchEmployees();
  }, []);

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setAssignedEmployee(complaint.staff_assigned || ''); // Set the assigned employee
    setIsPopupOpen(true); // Open popup
  };

  const handleAssignEmployee = async () => {
    setassignmentLoading(true);
    if(assignedEmployee === ""){
      setMessage("Please pick an employee first");
      setAssignedEmployee('');
      setassignmentLoading(false);
      return
    }
    else{
      setMessage("");
    }
    try {
      await axios.put(`http://localhost:5000/api/complaints/${selectedComplaint.id}/assign`, {
        staff_assigned: assignedEmployee,
      });

      // Refresh complaints after successful assignment
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === selectedComplaint.id
            ? { ...complaint, staff_assigned: assignedEmployee }
            : complaint
        )
      );
      setIsPopupOpen(false); // Close the popup after assignment
    } catch (error) {
      setError('Failed to assign employee.');
    }
    setassignmentLoading(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="view-complaints">
      <Typography variant="h3" gutterBottom>
        Complaints
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>WhatsApp Number</TableCell>
              <TableCell>Complaint</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>{complaint.id}</TableCell>
                <TableCell>{complaint.customer_name}</TableCell>
                <TableCell>{complaint.customer_email}</TableCell>
                <TableCell>{complaint.mobile_number}</TableCell>
                <TableCell>{complaint.whatsapp_number}</TableCell>
                <TableCell>{complaint.complaint}</TableCell>
                <TableCell>
                  <a
                    href={complaint.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Location
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewComplaint(complaint)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup Dialog */}
      {isPopupOpen && selectedComplaint && (
        <Dialog
          open={isPopupOpen}
          onClose={closePopup}
          sx={{ "& .MuiDialog-paper": { minWidth: "500px", padding: "20px" } }}
        >
          <DialogTitle>Complaint Details</DialogTitle>
          <DialogContent>
            <Typography>
              <strong>Customer Name:</strong> {selectedComplaint.customer_name}
            </Typography>
            <Typography>
              <strong>Complaint:</strong> {selectedComplaint.complaint}
            </Typography>
            <Typography>
              <strong>Location:</strong>{" "}
              <Link href={selectedComplaint.location}>Show location</Link>
            </Typography>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <span>Assign employee:</span>
              <Select
                value={assignedEmployee}
                onChange={(e) => setAssignedEmployee(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Employee</em>
                </MenuItem>
                {employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
          {assignmentLoading ? (
              <CircularProgress /> // Show loader when loading
            ) : (
              <Button
              onClick={handleAssignEmployee}
              variant="contained"
              color="primary"
            >
              Assign
            </Button>
            )}
            
            <Button onClick={closePopup} color="secondary">
              Close
            </Button>
          </DialogActions>
          <Typography variant="body2" color="error">
            {message}
          </Typography>
        </Dialog>
      )}
    </div>
  );
}

export default ViewComplaints;
