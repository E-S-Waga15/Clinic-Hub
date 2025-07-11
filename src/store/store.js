
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fillDataReducer from './slices/fillDataSlice';
import logOutReducer from './slices/logOutSlice'; 
import specialtyReducer from './slices/specialtySlice';
import doctorsReducer from './slices/doctorsSlice';
import infodoctorReducer  from './slices/infodoctorSlice';
import availableDaysReducer   from './slices/availableDaysSlice';
import availableSlotsReducer   from './slices/availableSlotsSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    fillData: fillDataReducer,
    logout: logOutReducer,
    specialties: specialtyReducer,
    doctors: doctorsReducer,
    infodoctor: infodoctorReducer, 
    availableDays: availableDaysReducer,
    availableSlots: availableSlotsReducer,
    appointment: appointmentReducer,
  },
});

export default store;
