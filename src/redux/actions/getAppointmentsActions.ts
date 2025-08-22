import type { Appointment, GetAppointmentsParams } from "@/useCases/getAppointments";
import * as types from "../types/getAppointmentsTypes";

export const GetAppointmentsRequest = (payload: GetAppointmentsParams) => ({
  type: types.GET_APPOINTMENTS_REQUEST,
  payload,
});

export const GetAppointmentsSuccess = (payload: Appointment[]) => ({
  type: types.GET_APPOINTMENTS_SUCCESS,
  payload,
});

export const GetAppointmentsError = (payload: string) => ({
  type: types.GET_APPOINTMENTS_ERROR,
  payload,
});

export const GetAppointmentsReset = () => ({
  type: types.GET_APPOINTMENTS_RESET,
});