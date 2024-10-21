import React, { useState , Suspense, useEffect} from "react";
import { Routes, Route, useNavigate, useLocation , Navigate  } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Flights from "./Components/Flights";
import Hotels from "./Components/Hotels";
import Cabs from "./Components/Cabs";
import Login from "./Components/Login";
import { CircularProgress } from '@mui/material';
import './App.css'; 
const AdminDashboard = React.lazy(() => import('./Components/AdminDashboard'));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const [flightData, setFlightData] = useState({
    fromLocation: '',
    toLocation: '',
    departureDate: '',
  });

  const [hotelData, setHotelData] = useState({
    city: '',
    checkinDate: '',
    checkoutDate: '',
    noOfPersons: '',
  });

  const [cabData, setCabData] = useState({
    fromLocation: '',
    toLocation: '',
    pickupDate: '',
    pickupTime: '',
  });

  const [errors, setErrors] = useState({
    flightErrors: {},
    hotelErrors: {},
    cabErrors: {},
  });


  const resetAllForms = () => {
    setFlightData({
      fromLocation: '',
      toLocation: '',
      departureDate: '',
    });
    setHotelData({
      city: '',
      checkinDate: '',
      checkoutDate: '',
      noOfPersons: '',
    });
    setCabData({
      fromLocation: '',
      toLocation: '',
      pickupDate: '',
      pickupTime: '',
    });
    setErrors({
      flightErrors: {},
      hotelErrors: {},
      cabErrors: {},
    });
  };

  const validateFlightForm = () => {
    const flightErrors = {};
    if (!flightData.fromLocation) flightErrors.fromLocation = "From Location is required.";
    if (!flightData.toLocation) flightErrors.toLocation = "To Location is required.";
    if (!flightData.departureDate) flightErrors.departureDate = "Departure Date is required.";
    return flightErrors;
  };

  const validateHotelForm = () => {
    const hotelErrors = {};
    if (!hotelData.city) hotelErrors.city = "City is required.";
    if (!hotelData.checkinDate) hotelErrors.checkinDate = "Check-in Date is required.";
    if (!hotelData.checkoutDate) hotelErrors.checkoutDate = "Check-out Date is required.";
    if (!hotelData.noOfPersons || hotelData.noOfPersons <= 0) hotelErrors.noOfPersons = "Number of persons is required.";
    return hotelErrors;
  };

  const validateCabForm = () => {
    const cabErrors = {};
    if (!cabData.fromLocation) cabErrors.fromLocation = "From Location is required.";
    if (!cabData.toLocation) cabErrors.toLocation = "To Location is required.";
    if (!cabData.pickupDate) cabErrors.pickupDate = "Pickup Date is required.";
    if (!cabData.pickupTime) cabErrors.pickupTime = "Pickup Time is required.";
    return cabErrors;
  };

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

    const flightErrors = validateFlightForm();
    const hotelErrors = validateHotelForm();
    const cabErrors = validateCabForm();
  
    if (Object.keys(flightErrors).length > 0) {
      setErrors({ ...errors, flightErrors });
      navigate("/flights"); 
      return;
    }
  
    if (Object.keys(hotelErrors).length > 0) {
      setErrors({ ...errors, hotelErrors });
      navigate("/hotels");
      return;
    }
  
    if (Object.keys(cabErrors).length > 0) {
      setErrors({ ...errors, cabErrors });
      return;
    }
  
    const allFormData = { flightData, hotelData, cabData };
    const storedData = JSON.parse(sessionStorage.getItem('bookingData')) || [];
    const newId = storedData.length ? storedData[storedData.length - 1].id + 1 : 1;
    const newEntry = { id: newId, ...allFormData };
  
    storedData.push(newEntry);
    sessionStorage.setItem('bookingData', JSON.stringify(storedData));
  
    console.log("Stored All Form Data with ID:", newEntry);
    resetAllForms();
    setErrors({ flightErrors: {}, hotelErrors: {}, cabErrors: {} });
  };
  
  const getDataById = (id) => {
    const storedData = JSON.parse(sessionStorage.getItem('bookingData')) || [];
    return storedData.find((entry) => entry.id === id);
  };
  
  
  return (
    <div className="app-container">
      {!isLoading && location.pathname !== '/login' && location.pathname !== '/admin-dashboard' && <Navbar />}
      
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/flights" element={<Flights flightData={flightData} setFlightData={setFlightData} errors={errors.flightErrors} onNext={handleNextFromFlights} />} />
            <Route path="/hotels" element={<Hotels hotelData={hotelData} setHotelData={setHotelData} errors={errors.hotelErrors} onNext={handleNextFromHotels} onBack={() => navigate("/flights")} />} />
            <Route path="/cabs" element={<Cabs cabData={cabData} setCabData={setCabData} errors={errors.cabErrors} onSubmit={handleSubmitCabs} onBack={() => navigate("/hotels")} />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
};

export default App;
