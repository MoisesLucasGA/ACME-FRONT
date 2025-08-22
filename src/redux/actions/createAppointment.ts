import type { Appointment } from "@/useCases/getAppointments";
import type { CreateAppointmentParams } from "@/useCases/createAppointment";
import * as types from "../types/createAppointmentTypes";

export const CreateAppointmentRequest = (payload: CreateAppointmentParams) => ({
  type: types.CREATE_APPOINTMENT_REQUEST,
  payload,
});

export const CreateAppointmentSuccess = (payload: Appointment) => ({
  type: types.CREATE_APPOINTMENT_SUCCESS,
  payload,
});

export const CreateAppointmentError = (payload: string) => ({
  type: types.CREATE_APPOINTMENT_ERROR,
  payload,
});

export const CreateAppointmentReset = () => ({
  type: types.CREATE_APPOINTMENT_RESET,
});