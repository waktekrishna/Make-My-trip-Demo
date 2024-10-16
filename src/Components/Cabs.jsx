import React from "react";
import './Cabs.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOCATIONS  = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const Cabs = ({ cabData, setCabData, errors, onSubmit, onBack }) => {
  const handleChange = (e) => {
    setCabData({
      ...cabData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    toast.success('Data saved successfully!', {
      position: "top-right",
      autoClose: 3000, 
    });

    setCabData({
      fromLocation: '',
      toLocation: '',
      pickupDate: '',
      pickupTime: '',
    });

    onSubmit();
  };

  return (
    <div className="cab-form">
      <h2>Book Cabs</h2>
      <div className="form-group">
        <label>From Location</label>
        <select className="form-control" name="fromLocation" value={cabData.fromLocation} onChange={handleChange}>
          <option value="">Select From Location</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        {errors.fromLocation && <p className="error-message">{errors.fromLocation}</p>}
      </div>

      <div className="form-group">
        <label>To Location</label>
        <select className="form-control" name="toLocation" value={cabData.toLocation} onChange={handleChange}>
          <option value="">Select To Location</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        {errors.toLocation && <p className="error-message">{errors.toLocation}</p>}
      </div>
      <div>
        <label>Pickup Date</label>
        <input type="date" name="pickupDate" value={cabData.pickupDate} onChange={handleChange}/>
        {errors.pickupDate && <p className="error-message">{errors.pickupDate}</p>}
      </div>
      <div>
        <label>Pickup Time</label>
        <input type="time" name="pickupTime" value={cabData.pickupTime} onChange={handleChange}/>
        {errors.pickupTime && <p className="error-message">{errors.pickupTime}</p>}
      </div>

      <div className="d-flex justify-content-between">
      <button className="btn btn-primary" onClick={onBack}>Back</button>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>

      <ToastContainer />
    </div>
  );
};
  export default Cabs;
  

