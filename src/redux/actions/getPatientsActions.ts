import type { GetPatientsParams, Patient } from "@/useCases/getPatient";
import * as types from "../types/getPatientsTypes";

export const GetPatientsRequest = (payload: GetPatientsParams) => ({
  type: types.GET_PATIENTS_REQUEST,
  payload,
});

export const GetPatientsSuccess = (payload: Patient[]) => ({
  type: types.GET_PATIENTS_SUCCESS,
  payload,
});

export const GetPatientsError = (payload: string) => ({
  type: types.GET_PATIENTS_ERROR,
  payload,
});

export const GetPatientsReset = () => ({
  type: types.GET_PATIENTS_RESET,
});