import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import {
  GetPatientsInitialState,
  GetPatientReducer,
} from "./reducers/getPatientsReducer";
import {
  GetAppointmentsInitialState,
  GetAppointmentsReducer
} from "./reducers/getAppointmentsReducer";
import { rootSaga } from "./rootSaga";
import { CreatePatientInitialState, CreatePatientReducer } from "./reducers/createPatientReducer";
import { CreateAppointmentInitialState, CreateAppointmentReducer } from "./reducers/createAppointmentreducer";

const sagaMiddleware = createSagaMiddleware();

export type RootState = {
  getPatients: typeof GetPatientsInitialState;
  createPatient: typeof CreatePatientInitialState;
  getAppointments: typeof GetAppointmentsInitialState;
  createAppointment: typeof CreateAppointmentInitialState;
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false, }).concat(sagaMiddleware),
  reducer: {
    getPatients: GetPatientReducer,
    createPatient: CreatePatientReducer,
    getAppointments: GetAppointmentsReducer,
    createAppointment: CreateAppointmentReducer,
  },
});

sagaMiddleware.run(rootSaga);