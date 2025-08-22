import { type UnknownAction } from "redux";
import * as types from "../types/getAppointmentsTypes";
import type { Appointment } from "@/useCases/getAppointments";

export const GetAppointmentsInitialState = {
  success: false,
  load: false,
  data: null as unknown as Appointment[],
  error: "",
};

export const GetAppointmentsReducer = (
  state = GetAppointmentsInitialState,
  action: UnknownAction,
) => {
  const newState = { ...state };

  switch (action.type) {
    case types.GET_APPOINTMENTS_REQUEST:
      newState.load = true;
      newState.error = "";
      newState.success = false;
      newState.data = null as unknown as Appointment[];
      return newState;

    case types.GET_APPOINTMENTS_SUCCESS:
      newState.load = false;
      newState.success = true;
      newState.data = action.payload as Appointment[];
      return newState;

    case types.GET_APPOINTMENTS_ERROR:
      newState.load = false;
      newState.success = false;
      newState.data = null as unknown as Appointment[];
      newState.error = action.payload as string;
      return newState;

    case types.GET_APPOINTMENTS_RESET:
      return GetAppointmentsInitialState;

    default:
      return { ...state };
  }
};