import React from 'react'
import { CheckCircleOutline, PersonAdd, PhoneCallback, Build } from '@mui/icons-material';
import './ComplaintTimeline.css'

const ComplaintTimeline = () => {
  const timelineSteps = [
    {
      label: 'Complaint Registered',
      icon: <CheckCircleOutline fontSize="large" />,
      description: 'Your complaint has been successfully registered with us.',
    },
    {
      label: 'Assigned to a Professional',
      icon: <PersonAdd fontSize="large" />,
      description: 'We have assigned your complaint to one of our professionals.',
    },
    {
      label: 'Professional Contacts You',
      icon: <PhoneCallback fontSize="large" />,
      description: 'The assigned professional will contact you to schedule a visit.',
    },
    {
      label: 'Repair Visit Scheduled',
      icon: <Build fontSize="large" />,
      description: 'The professional will visit your location to carry out the repair.',
    },
  ];
  return (
    <div className="cards-container">
      {timelineSteps.map((item,key)=>(
        <div id={key} className="card">
         <h3>{item.label}</h3>
         <div className="icon">{item.icon}</div> 
         <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ComplaintTimeline