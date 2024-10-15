import React from "react";
import './Flights.scss';


const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];


const Flights = ({ flightData, setFlightData, errors, onNext }) => {
    const handleChange = (e) => {
      setFlightData({
        ...flightData,
        [e.target.name]: e.target.value,
      });
    };
  
    return (
      <div className="flight-form">
        <h2>Book Flights</h2>
      {/* From Location */}
      <div className="form-group">
        <label>From Location</label>
        <select
          className="form-control"
          name="fromLocation"
          value={flightData.fromLocation}
          onChange={handleChange}
        >
          <option value="">Select City</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.fromLocation && <p className="error-message">{errors.fromLocation}</p>}
      </div>

      {/* To Location */}
      <div className="form-group">
        <label>To Location</label>
        <select
          className="form-control"
          name="toLocation"
          value={flightData.toLocation}
          onChange={handleChange}
        >
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
          <input
            type="date"
            name="departureDate"
            value={flightData.departureDate}
            onChange={handleChange}
          />
          {errors.departureDate && <p className="error-message">{errors.departureDate}</p>}
        </div>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    );
  };
  
  export default Flights;
  
