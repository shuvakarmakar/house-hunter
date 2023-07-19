
const Modal = ({ showModal, setShowModal, handleBooking, handleInputChange, bookingData }) => {
  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <h2>Booking Form</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={bookingData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={bookingData.email}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={bookingData.phone}
            onChange={handleInputChange}
          />
          <button onClick={handleBooking}>Booking</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    )
  );
};

export default Modal;
