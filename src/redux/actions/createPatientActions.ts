import type { Patient } from "@/useCases/getPatient";
import type { CreatePatientParams } from "@/useCases/createPatient";
import * as types from "../types/createPatienTypes";

export const CreatePatientRequest = (payload: CreatePatientParams) => ({
  type: types.CREATE_PATIENT_REQUEST,
  payload,
});

export const CreatePatientSuccess = (payload: Patient) => ({
  type: types.CREATE_PATIENT_SUCCESS,
  payload,
});

export const CreatePatientError = (payload: string) => ({
  type: types.CREATE_PATIENT_ERROR,
  payload,
});

export const CreatePatientReset = () => ({
  type: types.CREATE_PATIENT_RESET,
});