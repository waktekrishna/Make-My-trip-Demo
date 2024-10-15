import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation  } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Flights from "./Components/Flights";
import Hotels from "./Components/Hotels";
import Cabs from "./Components/Cabs";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for Flights form data
  const [flightData, setFlightData] = useState({
    fromLocation: '',
    toLocation: '',
    departureDate: '',
  });

  // State for Hotels form data
  const [hotelData, setHotelData] = useState({
    city: '',
    checkinDate: '',
    checkoutDate: '',
    noOfPersons: '',
  });

  // State for Cabs form data
  const [cabData, setCabData] = useState({
    fromLocation: '',
    toLocation: '',
    pickupDate: '',
    pickupTime: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({
    flightErrors: {},
    hotelErrors: {},
    cabErrors: {},
  });

  // Validation function for Flights form
  const validateFlightForm = () => {
    const flightErrors = {};
    if (!flightData.fromLocation) flightErrors.fromLocation = "From Location is required.";
    if (!flightData.toLocation) flightErrors.toLocation = "To Location is required.";
    if (!flightData.departureDate) flightErrors.departureDate = "Departure Date is required.";
    return flightErrors;
  };

  // Validation function for Hotels form
  const validateHotelForm = () => {
    const hotelErrors = {};
    if (!hotelData.city) hotelErrors.city = "City is required.";
    if (!hotelData.checkinDate) hotelErrors.checkinDate = "Check-in Date is required.";
    if (!hotelData.checkoutDate) hotelErrors.checkoutDate = "Check-out Date is required.";
    if (!hotelData.noOfPersons || hotelData.noOfPersons <= 0) hotelErrors.noOfPersons = "Number of persons is required.";
    return hotelErrors;
  };

  // Validation function for Cabs form
  const validateCabForm = () => {
    const cabErrors = {};
    if (!cabData.fromLocation) cabErrors.fromLocation = "From Location is required.";
    if (!cabData.toLocation) cabErrors.toLocation = "To Location is required.";
    if (!cabData.pickupDate) cabErrors.pickupDate = "Pickup Date is required.";
    if (!cabData.pickupTime) cabErrors.pickupTime = "Pickup Time is required.";
    return cabErrors;
  };

  // Navigation handlers with validation
  const handleNextFromFlights = () => {
    const flightErrors = validateFlightForm();
    if (Object.keys(flightErrors).length > 0) {
      setErrors({ ...errors, flightErrors });
    } else {
      setErrors({ ...errors, flightErrors: {} });
      navigate("/hotels");
    }
  };

  const handleNextFromHotels = () => {
    const hotelErrors = validateHotelForm();
    if (Object.keys(hotelErrors).length > 0) {
      setErrors({ ...errors, hotelErrors });
    } else {
      setErrors({ ...errors, hotelErrors: {} });
      navigate("/cabs");
    }
  };

  const handleSubmitCabs = () => {
    const isConfirmed = window.confirm("Are you sure you want to submit the form?");

    // Validate all forms
    const flightErrors = validateFlightForm();
    const hotelErrors = validateHotelForm();
    const cabErrors = validateCabForm();
  
    // If there are any errors in flight form, redirect to Flights form
    if (Object.keys(flightErrors).length > 0) {
      setErrors({ ...errors, flightErrors });
      navigate("/flights");  // Redirect to Flights form
      return;
    }
  
    // If there are any errors in hotel form, redirect to Hotels form
    if (Object.keys(hotelErrors).length > 0) {
      setErrors({ ...errors, hotelErrors });
      navigate("/hotels");  // Redirect to Hotels form
      return;
    }
  
    // If there are errors in the cabs form, stay on Cabs form and show errors
    if (Object.keys(cabErrors).length > 0) {
      setErrors({ ...errors, cabErrors });
      return;
    }
  
    // If all forms are valid, generate an ID and store data in session storage
    const allFormData = { flightData, hotelData, cabData };
  
    // Get current data from session storage or initialize as an empty array
    const storedData = JSON.parse(sessionStorage.getItem('bookingData')) || [];
  
    // Generate a new ID (start from 1, increment based on the length of stored data)
    const newId = storedData.length ? storedData[storedData.length - 1].id + 1 : 1;
  
    // Add the new data with the generated ID
    const newEntry = { id: newId, ...allFormData };
  
    // Update the session storage with the new entry
    storedData.push(newEntry);
    sessionStorage.setItem('bookingData', JSON.stringify(storedData));
  
    console.log("Stored All Form Data with ID:", newEntry);
  
    // Reset errors after successful submission
    setErrors({ flightErrors: {}, hotelErrors: {}, cabErrors: {} });
  
    // Optionally redirect or reset the form for a new entry
  };
  
  // Function to retrieve data by ID from session storage
  const getDataById = (id) => {
    const storedData = JSON.parse(sessionStorage.getItem('bookingData')) || [];
    return storedData.find((entry) => entry.id === id);
  };
  
  
  return (
    <div>
 {location.pathname !== '/login' && location.pathname !== '/admin-dashboard' && <Navbar />}


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard Route */}

        <Route
          path="/flights"
          element={
            <Flights
              flightData={flightData}
              setFlightData={setFlightData}
              errors={errors.flightErrors}
              onNext={handleNextFromFlights}
            />
          }
        />
        <Route
          path="/hotels"
          element={
            <Hotels
              hotelData={hotelData}
              setHotelData={setHotelData}
              errors={errors.hotelErrors}
              onNext={handleNextFromHotels}
              onBack={() => navigate("/flights")}
            />
          }
        />
        <Route
          path="/cabs"
          element={
            <Cabs
              cabData={cabData}
              setCabData={setCabData}
              errors={errors.cabErrors}
              onSubmit={handleSubmitCabs}
              onBack={() => navigate("/hotels")}
            />
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
