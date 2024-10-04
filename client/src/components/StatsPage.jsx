// StatsPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StatsPage = () => {
  const [complaintsData, setComplaintsData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  useEffect(() => {
    // Fetch number of complaints over time
    axios.get('http://localhost:5000/api/complaints/complaints-over-time')
      .then(response => {
        setComplaintsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching complaints data:', error);
      });

    // Fetch number of completed complaints over time
    axios.get('http://localhost:5000/api/complaints/completed-complaints-over-time')
      .then(response => {
        setCompletedData(response.data);
      })
      .catch(error => {
        console.error('Error fetching completed complaints data:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateChartData = (data, label) => {
    return {
      labels: data.map(item => formatDate(item.date)),
      datasets: [{
        label: label,
        data: data.map(item => item.count),
        borderColor: '#004d40', // Darker teal color
        backgroundColor: 'rgba(0, 77, 64, 0.2)', // Lighter teal background
        borderWidth: 2,
      }],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333', // Darker text color for the legend
        },
      },
      tooltip: {
        backgroundColor: '#333', // Tooltip background color
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff', // Tooltip body color
        callbacks: {
          label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#ddd', // Grid lines color
        },
        ticks: {
          color: '#333', // X-axis tick color
        },
      },
      y: {
        grid: {
          color: '#ddd', // Grid lines color
        },
        ticks: {
          color: '#333', // Y-axis tick color
        },
      },
    },
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Number of Complaints Over Time
            </Typography>
            <Line
              data={generateChartData(complaintsData, 'Complaints')}
              options={chartOptions}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Number of Completed Complaints Over Time
            </Typography>
            <Line
              data={generateChartData(completedData, 'Completed Complaints')}
              options={chartOptions}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatsPage;
