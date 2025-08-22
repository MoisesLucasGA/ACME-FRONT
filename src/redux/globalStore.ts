import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import {
  GetPatientsInitialState,
  GetPatientReducer,
} from "./reducers/getPatientsReducer";
import { rootSaga } from "./rootSaga";
import { CreatePatientInitialState, CreatePatientReducer } from "./reducers/createPatientReducer";

const sagaMiddleware = createSagaMiddleware();

export type RootState = {
  getPatients: typeof GetPatientsInitialState;
  createPatient: typeof CreatePatientInitialState;
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false, }).concat(sagaMiddleware),
  reducer: {
    getPatients: GetPatientReducer,
    createPatient: CreatePatientReducer
  },
});

sagaMiddleware.run(rootSaga);