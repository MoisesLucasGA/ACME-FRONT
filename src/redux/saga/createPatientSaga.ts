import axios from "axios";
import { call, put } from "redux-saga/effects";
import * as actions from "../actions/createPatientActions";
import type { CreatePatientResponse } from "@/useCases/createPatient";

export const controller = async (payload: any): Promise<unknown> => {
  try {
    const result = (
      await axios.post("https://localhost:7254/api/patients", {...payload})
    )

    if (result.data.code !== 200) {
        throw new Error(result.data.message || "Erro desconhecido");
    }

    return { success: true, data: result.data.data, error: "" };
    
  } catch (error:any) {
    const message = error.response?.data?.message || error.message || "Erro desconhecido";
    return { success: false, data: {}, error: message };
  }

};

export function* CreatePatientSaga({ payload }: any) {
  try {
    const result: CreatePatientResponse = yield call(controller, payload);
    yield put(actions.CreatePatientSuccess(result.data));
  } catch (error: any) {
    yield put(actions.CreatePatientError(error.toString()));
  }
}