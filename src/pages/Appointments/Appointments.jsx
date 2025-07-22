import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
// Make sure these paths are correct relative to your project structure
import SpecialtiesModal from '../Home/LoggedIn/SpecialtyModal/SpecialtyModal'; // Adjust path as needed
import DoctorsModal from '../Home/LoggedIn/DoctorsModal/DoctorsModal';         // Adjust path as needed
import BookingModal from '../Home/LoggedIn/BookingModal/BookingModal';   

const Appointments = () => {
  // State for managing modal visibility and data passed between them
  const [isSpecialtiesModalOpen, setIsSpecialtiesModalOpen] = useState(false);
  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);
  const [idDoctor, setIdDoctor] = useState(null);

  // Dummy data for appointments
  const appointments = [
    { number: 1, time: "10:30 AM", category: "Ophthalmology", doctor: "Dr.Mariam Said" },
    { number: 2, time: "10:30 AM", category: "Ophthalmology", doctor: "Dr.Mariam Said" },
    { number: 3, time: "10:30 AM", category: "Ophthalmology", doctor: "Dr.Mariam Said", selected: true },
    { number: 4, time: "10:30 AM", category: "Ophthalmology", doctor: "Dr.Mariam Said" },
  ];

  // Inline styles for the table headers
  const headerStyle = {
    backgroundColor: "#006D6F",
    color: "white",
    borderRadius: "8px",
    padding: "12px 24px",
    textAlign: "center",
    margin: "0 10px",
    whiteSpace: "nowrap",
  };

  // Inline style for the main heading text
  const textStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    lineHeight: "1.3",
    color: "#1a1a1a",
  };

  // Handler to open the Specialties Modal when the "BOOK" button is clicked
  const handleBookButtonClick = () => {
    setIsSpecialtiesModalOpen(true);
  };

  // Handler for when a specialty is selected in SpecialtiesModal
  const handleSpecialtySelect = (title, id) => {
    setSelectedSpecialty(title);
    setSelectedSpecialtyId(id);
    setIsSpecialtiesModalOpen(false); // Close specialties modal
    setIsDoctorsModalOpen(true);      // Open doctors modal
  };

  // Handler for when a doctor is selected in DoctorsModal for booking
  const handleBookDoctor = (doctorId) => {
    setIdDoctor(doctorId);
    setIsDoctorsModalOpen(false); // Close doctors modal
    setIsBookingModalOpen(true);  // Open booking modal
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FBFC",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container fluid="md" className="py-5">
        <Row className="align-items-center g-5">
          {/* Text content: Appears first on all screens */}
          <Col xs={12} lg={5} className="order-1">
            <div className="px-2 text-center text-lg-start">
              <h1 style={textStyle}>
                Your steps<br />
                towards<br />
                better health<br />
                start here.
              </h1>
              <p
                className="text-muted mt-3"
                style={{ fontSize: "1.05rem", lineHeight: "1.8" }}
              >
                Don’t wait until you get sick.<br />
                Take care of your health now and<br />
                invest in it.
              </p>
              <Button
                variant="dark"
                style={{
                  width: 250,
                  backgroundColor: "#006D6F",
                  borderColor: "#006D6F",
                  padding: "10px 28px",
                  fontWeight: "500",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  marginTop: "20px",
                }}
                onClick={handleBookButtonClick} // Attaches the click handler
              >
                BOOK
              </Button>
            </div>
          </Col>

          {/* Table content: Appears next to text on large screens, below on small */}
          <Col xs={12} lg={7} className="order-2">
            <h3 className="text-center mb-4">my Appointments</h3>
            <div
              className="p-4"
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div className="table-responsive">
                <Table borderless className="mb-0">
                  <thead>
                    <tr className="text-nowrap">
                      {["Number", "Date", "Categories", "Doctor"].map((header, i) => (
                        <th key={i}>
                          <div style={headerStyle}>{header}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((app) => (
                      <tr
                        key={app.number}
                        style={{
                          backgroundColor: app.selected ? "#F8E4E1" : "transparent",
                          textAlign: "center",
                        }}
                      >
                        <td style={{ color: "#006D6F", padding: "12px" }}>{app.number}</td>
                        <td style={{ color: "#006D6F", padding: "12px" }}>{app.time}</td>
                        <td style={{ color: "#006D6F", padding: "12px" }}>{app.category}</td>
                        <td style={{ color: "#006D6F", padding: "12px" }}>{app.doctor}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modals are rendered here, controlled by state */}
      <SpecialtiesModal
        isOpen={isSpecialtiesModalOpen}
        onClose={() => setIsSpecialtiesModalOpen(false)}
        onSelectSpecialty={handleSpecialtySelect}
      />

      <DoctorsModal
        isOpen={isDoctorsModalOpen}
        onClose={() => setIsDoctorsModalOpen(false)}
        selectedSpecialty={selectedSpecialty}
        selectedSpecialtyId={selectedSpecialtyId}
        onBook={handleBookDoctor}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        idDoctor={idDoctor}
      />
    </div>
  );
};

export default Appointments;