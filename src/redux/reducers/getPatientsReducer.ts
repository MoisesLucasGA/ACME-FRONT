import { type UnknownAction } from "redux";
import * as types from "../types/getPatientsTypes";
import type { Patient } from "@/useCases/getPatient";

export const GetPatientsInitialState = {
  success: false,
  load: false,
  data: null as unknown as Patient[],
  error: "",
};

export const GetPatientReducer = (
  state = GetPatientsInitialState,
  action: UnknownAction,
) => {
  const newState = { ...state };

  switch (action.type) {
    case types.GET_PATIENTS_REQUEST:
      newState.load = true;
      newState.error = "";
      newState.success = false;
      newState.data = null as unknown as Patient[];
      return newState;

    case types.GET_PATIENTS_SUCCESS:
      newState.load = false;
      newState.success = true;
      newState.data = action.payload as Patient[];
      return newState;

    case types.GET_PATIENTS_ERROR:
      newState.load = false;
      newState.success = false;
      newState.data = null as unknown as Patient[];
      newState.error = action.payload as string;
      return newState;

    case types.GET_PATIENTS_RESET:
      return GetPatientsInitialState;

    default:
      return { ...state };
  }
};