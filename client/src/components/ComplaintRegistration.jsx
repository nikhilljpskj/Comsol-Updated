import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Paper, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CustomerNavbar from './CustomerNavbar';

function ComplaintRegistration() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [complaint, setComplaint] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [autoLocation, setAutoLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAutoLocation(`https://www.google.com/maps/place/${latitude},${longitude}/`);
          setManualLocation(''); // Clear manual input if auto location is fetched
        },
        (error) => {
          setLocationError('Unable to retrieve your location.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const handleManualLocationChange = (e) => {
    setManualLocation(e.target.value);
    if (autoLocation) {
      setAutoLocation(''); // Clear auto location if manual input is changed
    }
  };

  const handleRemoveAutoLocation = () => {
    setAutoLocation('');
    setManualLocation(''); // Optional: Clear manual location as well
  };

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number
    if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError('Please enter a valid 10-digit mobile number.');
      return;
    } else {
      setMobileNumberError('');
    }

    if (!manualLocation && !autoLocation) {
      setLocationError('Please provide either a manual location or fetch your current location.');
      return;
    } else {
      setLocationError('');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/complaints', {
        customerName,
        customerEmail,
        mobileNumber,
        whatsappNumber,
        complaint,
        location: manualLocation || autoLocation
      });

      if (response.status === 200) {
        alert('Complaint registered successfully');
        setCustomerName('');
        setCustomerEmail('');
        setMobileNumber('');
        setWhatsappNumber('');
        setComplaint('');
        setManualLocation('');
        setAutoLocation('');
      }
    } catch (error) {
      console.error('Error registering complaint:', error);
    }
  };

  return (
    <>
    <CustomerNavbar id={localStorage.getItem("complaint_id")}/>
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Register Complaint
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Email ID"
              type="email"
              variant="outlined"
              fullWidth
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              error={!!mobileNumberError}
              helperText={mobileNumberError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="WhatsApp Number"
              variant="outlined"
              fullWidth
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Complaint"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Enter Location Manually"
              variant="outlined"
              fullWidth
              value={manualLocation}
              onChange={handleManualLocationChange}
              disabled={!!autoLocation} // Disable if autoLocation is set
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLocationFetch}
              startIcon={<LocationOnIcon />}
              sx={{ mt: 2 }}
              disabled={!!manualLocation} // Disable if manualLocation is set
            >
              Fetch Current Location
            </Button>
            {autoLocation && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Current Location: <a href={autoLocation} target="_blank" rel="noopener noreferrer">{autoLocation}</a>
              </Typography>
            )}
            {autoLocation && (
              <Button
                variant="contained"
                color="error"
                size='small'
                startIcon={<RemoveCircleIcon />}
                onClick={handleRemoveAutoLocation}
                sx={{ mt: 1 }}
              >
                Remove Location & Enter Manually
              </Button>
            )}
            {locationError && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{locationError}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 2, px: 3, py: 1.5 }}
            >
              Submit Complaint
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    </>

  );
}

export default ComplaintRegistration;
