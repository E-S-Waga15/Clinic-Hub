// BookingModal.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingModal.css";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorById,
  clearDoctorInfo,
} from "../../../../store/slices/infodoctorSlice";
import {
  fetchAvailableDays,
  clearAvailableDays,
} from "../../../../store/slices/availableDaysSlice";
import {
  fetchAvailableSlots,
  clearAvailableSlots,
} from "../../../../store/slices/availableSlotsSlice";

const BookingModal = ({ isOpen, onClose, idDoctor }) => {
  const dispatch = useDispatch();
  const { infodoctor, loading, error } = useSelector(
    (state) => state.infodoctor || {}
  );
  const { days: availableDates } = useSelector(
    (state) => state.availableDays || {}
  );
  const { slots: availableSlots, loading: slotsLoading } = useSelector(
    (state) => state.availableSlots || {}
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());

  const loadAvailableDays = (dateToView) => {
    const year = dateToView.getFullYear();
    const month = (dateToView.getMonth() + 1).toString().padStart(2, "0");
    const day = dateToView.getDate().toString().padStart(2, "0");

    const todayFormatted = `${year}-${month}-${day}`; // اليوم الحالي

    const formattedDate = `${year}-${month}-01`; // بداية الشهر
    dispatch(fetchAvailableDays({ doctorId: idDoctor, date: todayFormatted }));
  };

  const loadAvailableSlots = (date) => {
    if (!date) return;
    const dateStr = date.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    dispatch(fetchAvailableSlots({ doctorId: idDoctor, date: dateStr }));
  };

  // التحميل الأولي للمعلومات
  useEffect(() => {
    if (isOpen && idDoctor) {
      dispatch(fetchDoctorById(idDoctor));
      loadAvailableDays(calendarStartDate);
    }
    return () => {
      dispatch(clearDoctorInfo());
      dispatch(clearAvailableDays());
      dispatch(clearAvailableSlots());
    };
  }, [isOpen, idDoctor]);

  // عند توفر الأيام المتاحة اختر أول يوم متاح
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      const firstDate = new Date(availableDates[0]);
      setSelectedDate(firstDate);
      loadAvailableSlots(firstDate);
    }
  }, [availableDates]);

  if (!isOpen) return null;

  return (
    <div className="booking-overlay">
      <div className="booking-wrapper">
        <div className="booking-header">
          <div className="booking-breadcrumb">
            <button className="booking-close" onClick={onClose}>
              <FaTimes />
            </button>
            {infodoctor &&
              `ClinicHub:\\${infodoctor.specialization}\\Doctors\\${infodoctor.first_name} ${infodoctor.last_name}`}
          </div>
        </div>

        <div className="booking-container booking-scroll-body">
          {loading ? (
            <p>Loading doctor info...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : infodoctor ? (
            <>
              <div className="booking-left">
                <img
                  src={infodoctor.imageUrl}
                  alt={infodoctor.first_name}
                  className="booking-image"
                />
                <h2 className="booking-name">
                  Dr. {infodoctor.first_name} {infodoctor.last_name}
                </h2>
                <p className="booking-title">{infodoctor.specialization}</p>
                <div className="booking-bio">
                  <h3>Biography</h3>
                  <p
                    className={`bio-text ${
                      isExpanded ? "expanded" : "clamped"
                    }`}
                  >
                    {infodoctor.bio}
                  </p>
                  {isSmallScreen && (
                    <span
                      className="show-more"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </span>
                  )}
                </div>
              </div>

              <div className="booking-right">
                <Calendar
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                    loadAvailableSlots(date);
                  }}
                  locale="en-US"
                  tileClassName={({ date }) => {
                    const dateStr = date.toLocaleDateString("sv-SE");
                    if (
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                    )
                      return "booking-calendar-tile-selected";
                    if (availableDates.includes(dateStr))
                      return "booking-calendar-available";
                    return "booking-calendar-disabled";
                  }}
                  tileDisabled={({ date }) => {
                    const dateStr = date.toLocaleDateString("sv-SE");
                    return !availableDates.includes(dateStr);
                  }}
                  onActiveStartDateChange={({ activeStartDate }) => {
                    setCalendarStartDate(activeStartDate);
                    loadAvailableDays(activeStartDate);
                  }}
                />

                <p className="booking-date">
                  {selectedDate &&
                    `${selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                    })}, ${selectedDate.getDate()} ${selectedDate.toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                      }
                    )}`}
                </p>

                <div className="booking-times">
                  {slotsLoading ? (
                    <p>Loading times...</p>
                  ) : availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        className={`booking-time ${
                          selectedTime === `${slot.start} - ${slot.end}`
                            ? "booking-selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedTime(`${slot.start} - ${slot.end}`)
                        }
                      >
                        {slot.start}
                      </button>
                    ))
                  ) : (
                    <p>No available times for this day.</p>
                  )}
                </div>

                <button
                  className="booking-button"
                  disabled={!selectedDate || !selectedTime}
                >
                  Book
                </button>
              </div>
            </>
          ) : (
            <p>No doctor data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
