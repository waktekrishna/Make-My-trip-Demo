import { useState } from 'react';
import React from "react";
import './Flights.scss';

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];


const Flights = ({ flightData, setFlightData, errors, onNext }) => {
  const [travelType, setTravelType] = useState("oneWay");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleTravelTypeChange = (e) => {
    setTravelType(e.target.value);

    if (e.target.value === "oneWay") {
      setFlightData((prevData) => ({
        ...prevData,
        returnDate: '',
      }));
    }
  };
  
    return (
      <div className="flight-form">
        <h2>Book Flights</h2>
  
  <div className="form-group">
  <label className="mb-2">Travel Type:</label>
  <div className="d-flex align-items-center">
    <div className="me-3">
      <label className="d-flex align-items-center">
        <input type="radio" value="oneWay" checked={travelType === "oneWay"} onChange={handleTravelTypeChange} className="me-2"/>
        One Way
      </label>
    </div>
    <div>
      <label className="d-flex align-items-center">
        <input type="radio" value="twoWay" checked={travelType === "twoWay"} onChange={handleTravelTypeChange} className="me-2"/>
        Two Way
      </label>
    </div>
  </div>
</div>

        <div className="form-group">
          <label>From Location</label>
          <select className="form-control" name="fromLocation" value={flightData.fromLocation} onChange={handleChange}>
            <option value="">Select City</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.fromLocation && <p className="error-message">{errors.fromLocation}</p>}
        </div>
  
        <div className="form-group">
          <label>To Location</label>
          <select className="form-control" name="toLocation" value={flightData.toLocation} onChange={handleChange}>
            <option value="">Select City</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.toLocation && <p className="error-message">{errors.toLocation}</p>}
        </div>
  
        <div>
          <label>Departure Date</label>
          <input type="date" name="departureDate" value={flightData.departureDate} onChange={handleChange}/>
          {errors.departureDate && <p className="error-message">{errors.departureDate}</p>}
        </div>
  
        {travelType === "twoWay" && (
          <div>
            <label>Return Date</label>
            <input type="date" name="returnDate" value={flightData.returnDate || ''} onChange={handleChange}/>
          </div>
        )}
  
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    );
  };
  
  export default Flights;
  
