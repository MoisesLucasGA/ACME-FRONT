import { type UnknownAction } from "redux";
import type { Patient } from "@/useCases/getPatient";
import * as types from "../types/createPatienTypes";

export const CreatePatientInitialState = {
  success: false,
  load: false,
  data: null as unknown as Patient,
  error: "",
};

export const CreatePatientReducer = (
  state = CreatePatientInitialState,
  action: UnknownAction,
) => {
  const newState = { ...state };

  switch (action.type) {
    case types.CREATE_PATIENT_REQUEST:
      newState.load = true;
      newState.error = "";
      newState.success = false;
      newState.data = null as unknown as Patient;
      return newState;

    case types.CREATE_PATIENT_SUCCESS:
      newState.load = false;
      newState.success = true;
      newState.data = action.payload as Patient;
      return newState;

    case types.CREATE_PATIENT_ERROR:
      newState.load = false;
      newState.success = false;
      newState.data = null as unknown as Patient;
      newState.error = action.payload as string;
      return newState;

    case types.CREATE_PATIENT_RESET:
      return CreatePatientInitialState;

    default:
      return { ...state };
  }
};