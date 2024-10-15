import React from "react";
import './Hotels.scss';


const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];


const Hotels = ({ hotelData, setHotelData, errors, onNext, onBack }) => {
    const handleChange = (e) => {
      setHotelData({
        ...hotelData,
        [e.target.name]: e.target.value,
      });
    };
  
    return (
      <div className="hotel-form">
        <h2>Book Hotels</h2>
        <div className="form-group">
        <label>City</label>
        <select
          className="form-control"
          name="city"
          value={hotelData.city}
          onChange={handleChange}
        >
          <option value="">Select City</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="error-message">{errors.city}</p>}
      </div>
        <div>
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkinDate"
            value={hotelData.checkinDate}
            onChange={handleChange}
          />
          {errors.checkinDate && <p className="error-message">{errors.checkinDate}</p>}
        </div>
        <div>
          <label>Check-out Date</label>
          <input
            type="date"
            name="checkoutDate"
            value={hotelData.checkoutDate}
            onChange={handleChange}
          />
          {errors.checkoutDate && <p className="error-message">{errors.checkoutDate}</p>}
        </div>
        <div>
          <label>No. of Persons</label>
          <input
            type="number"
            name="noOfPersons"
            value={hotelData.noOfPersons}
            onChange={handleChange}
          />
          {errors.noOfPersons && <p className="error-message">{errors.noOfPersons}</p>}
        </div>
        
        <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={onBack}>Back</button>
          <button className="btn btn-primary" onClick={onNext}>Next</button>
        </div>
      </div>
    );
  };
  
  export default Hotels;
  