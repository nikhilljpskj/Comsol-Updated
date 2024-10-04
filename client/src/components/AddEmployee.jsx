import React, { useState } from "react";
import axios from "axios";
import PopUpModal from "./PopUpModal";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Box,
} from "@mui/material";

function Registration() {

  const [open, setOpen] = useState(false);
  const [popUpContent, setPopupContent] = useState({title:"", message : "", option: ""});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    email: "",
    mobile: "",
    office: "",
    officeAddress: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      handleOpen();
      setPopupContent({title:"Success", message : `${formData.firstName} ${formData.lastName} was added successfully`, option: "Ok"} );
    } catch (error) {
      handleOpen();
      setPopupContent({title:"Something went wrong", message : "Couldn\'t create the user", option: "Try again"});
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 5,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add New Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>User Type</InputLabel>
                <Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Office"
                name="office"
                value={formData.office}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Office Address"
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Button
            sx={{
              marginTop: 2,
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </form>
      </Box>
      <PopUpModal
      open={open}
      onClose={handleClose}
      title={popUpContent.title}
      message={popUpContent.message}
      option={popUpContent.option}
      />
    </Container>
  );
}

export default Registration;
