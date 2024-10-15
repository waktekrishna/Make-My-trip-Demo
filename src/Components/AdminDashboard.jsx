import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Import Modal from react-modal
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.scss';


const AdminDashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to manage selected booking for modal
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
    const navigate = useNavigate(); 

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('bookingData')) || [];
    setBookingData(data);
  }, []);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBooking(null);
    };
    
    const handleLogout = () => {
        navigate('/login'); // Redirect to login page
      };

  return (
    <div>
<div className="admin-dashboard">
    <h2 className="dashboard-title">Admin Dashboard</h2>
    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

  {/* Other content */}
  {bookingData.length === 0 ? (
    <p className="no-data-message">No booking data available.</p>
  ) : (
    <table className="booking-table">
      <thead>
        <tr className="table-header">
          <th className="table-header-cell">Sr.No</th>
          <th className="table-header-cell">Flight From</th>
          <th className="table-header-cell">Hotel City</th>
          <th className="table-header-cell">Cab From</th>
          <th className="table-header-cell">Cab To</th>
          <th className="table-header-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookingData.map((item) => (
          <tr key={item.id} className="table-row">
            <td className="table-cell">{item.id}</td>
            <td className="table-cell">{item.flightData.fromLocation}</td>
            <td className="table-cell">{item.hotelData.city}</td>
            <td className="table-cell">{item.cabData.fromLocation}</td>
            <td className="table-cell">{item.cabData.toLocation}</td>
            <td className="table-cell">
              <button className="view-details-button" onClick={() => openModal(item)}>View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


      {/* Modal for displaying detailed booking data */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Booking Details">
        <h2 className="modal-title">Booking Details</h2>
        {selectedBooking && (
          <div>
            <h3>Flight Details:</h3>
            <p>From: {selectedBooking.flightData.fromLocation}</p>
            <p>To: {selectedBooking.flightData.toLocation}</p>
            <p>Departure Date: {selectedBooking.flightData.departureDate}</p>

            <h3>Hotel Details:</h3>
            <p>City: {selectedBooking.hotelData.city}</p>
            <p>Check-in Date: {selectedBooking.hotelData.checkinDate}</p>
            <p>Check-out Date: {selectedBooking.hotelData.checkoutDate}</p>
            <p>Number of Persons: {selectedBooking.hotelData.noOfPersons}</p>

            <h3>Cab Details:</h3>
            <p>From: {selectedBooking.cabData.fromLocation}</p>
            <p>To: {selectedBooking.cabData.toLocation}</p>
            <p>Pickup Date: {selectedBooking.cabData.pickupDate}</p>
            <p>Pickup Time: {selectedBooking.cabData.pickupTime}</p>
          </div>
        )}
        <button className="btn btn-primary" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};
Modal.setAppElement('#root');
export default AdminDashboard;
