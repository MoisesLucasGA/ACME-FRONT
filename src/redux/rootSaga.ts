import { all, takeLatest } from "redux-saga/effects";
import { GET_PATIENTS_REQUEST } from "./types/getPatientsTypes";
import { GetPatientSaga } from "./saga/getPatientSaga";
import { CREATE_PATIENT_REQUEST } from "./types/createPatienTypes";
import { CreatePatientSaga } from "./saga/createPatientSaga";
import { GET_APPOINTMENTS_REQUEST } from "./types/getAppointmentsTypes";
import { GetAppointmentsSaga } from "./saga/getAppointmentsSaga";
import { CREATE_APPOINTMENT_REQUEST } from "./types/createAppointmentTypes";
import { CreateAppointmentSaga } from "./saga/createAppointmentSaga";

export function* rootSaga(): Generator {
  return yield all([
    takeLatest<any>(GET_PATIENTS_REQUEST, GetPatientSaga),
    takeLatest<any>(CREATE_PATIENT_REQUEST, CreatePatientSaga),
    takeLatest<any>(GET_APPOINTMENTS_REQUEST, GetAppointmentsSaga),
    takeLatest<any>(CREATE_APPOINTMENT_REQUEST, CreateAppointmentSaga),
  ]);
}