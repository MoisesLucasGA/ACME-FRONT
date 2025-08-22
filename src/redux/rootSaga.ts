import { all, takeLatest } from "redux-saga/effects";
import { GET_PATIENTS_REQUEST } from "./types/getPatientsTypes";
import { GetPatientSaga } from "./saga/getPatientSaga";
import { CREATE_PATIENT_REQUEST } from "./types/createPatienTypes";
import { CreatePatientSaga } from "./saga/createPatientSaga";

export function* rootSaga(): Generator {
  return yield all([
    takeLatest<any>(GET_PATIENTS_REQUEST, GetPatientSaga),
    takeLatest<any>(CREATE_PATIENT_REQUEST, CreatePatientSaga)
  ]);
}