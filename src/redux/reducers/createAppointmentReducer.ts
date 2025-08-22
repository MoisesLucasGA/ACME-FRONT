import { type UnknownAction } from "redux";
import type { Appointment } from "@/useCases/getAppointments";
import * as types from "../types/createAppointmentTypes";

export const CreateAppointmentInitialState = {
  success: false,
  load: false,
  data: null as unknown as Appointment,
  error: "",
};

export const CreateAppointmentReducer = (
  state = CreateAppointmentInitialState,
  action: UnknownAction,
) => {
  const newState = { ...state };

  switch (action.type) {
    case types.CREATE_APPOINTMENT_REQUEST:
      newState.load = true;
      newState.error = "";
      newState.success = false;
      newState.data = null as unknown as Appointment;
      return newState;

    case types.CREATE_APPOINTMENT_SUCCESS:
      newState.load = false;
      newState.success = true;
      newState.data = action.payload as Appointment;
      return newState;

    case types.CREATE_APPOINTMENT_ERROR:
      newState.load = false;
      newState.success = false;
      newState.data = null as unknown as Appointment;
      newState.error = action.payload as string;
      return newState;

    case types.CREATE_APPOINTMENT_RESET:
      return CreateAppointmentInitialState;

    default:
      return { ...state };
  }
};